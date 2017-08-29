const express = require('express');
const bodyParser = require('body-parser');
const dbQ = require('./db').dbQuery;
const urlPrepend = require('./config.json');
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

//app.use(bodyParser.json);

/********** Knox Shenanigans ****************/
const knox = require('knox');
let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require('./secrets'); // secrets.json is in .gitignore
}
const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: 'maggiesgingerimageboard'
});

/********** Multer File Upload Shenanigans **************/
var diskStorage = multer.diskStorage({

    destination: function (req, file, callback) {
        console.log(file); //see all the stuff that the file contains
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) { //uid safe is passed the # of bytes you want the id to be and btw it is b64 encoded
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

/********** Actual Routes **************/
app.get('/home', (req, res, next)=> {
    return dbQ('getAllImages').then((results)=> {
        //console.log('SERVER /home:', results);
        var images = {images: formatHomeJSON(results)};
        //console.log("images: ", images);
        res.json(images);
        //res.json(formatHomeJSON(results));
    }).catch(e => console.log(e.stack));
});

app.post('/upload', uploader.single('file'), sendToAWS, function(req, res) {
    console.log('out of sendToAWS need to save to db');
    if (req.file) {
        console.log("file: ", req.file);
        console.log("body: ", req.body);
        var data = [
            req.file.filename,
            req.body.username,
            req.body.title,
            req.body.description
        ];
        return dbQ('saveImage', data).then((results) => {
            console.log('back from saving data: ', results);
            res.json({
                success: true
            });
        }).catch(e => console.error(e.stack));
    } else {
        res.json({
            success: false
        });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port 8080');
});


function formatHomeJSON(rows) {
    //this function is going to return a json object to send in the response
    //console.log(urlPrepend.s3Url);
    return rows.map(function(image) {
        image.image = urlPrepend.s3Url + image.image;
        return image;
    });
}

function sendToAWS(req, res, next) {
    console.log('in send to AWS function');
    const s3Request = client.put(req.file.filename, {
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    });

    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);
    next();
}
