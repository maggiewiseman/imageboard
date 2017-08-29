var express = require('express');
var bodyParser = require('body-parser');
var dbQ = require('./db').dbQuery;
var urlPrepend = require('./config.json');
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json);

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

app.get('/home', (req, res, next)=> {
    return dbQ('getAllImages').then((results)=> {
        //console.log('SERVER /home:', results);
        var images = {images: formatHomeJSON(results)};
        //console.log("images: ", images);
        res.json(images);
        //res.json(formatHomeJSON(results));
    }).catch(e => console.log(e.stack));
});

app.post('/upload', uploader.single('file'), function(req, res) {
    if (req.file) {
        console.log('the file object: ', req.file);
        res.json({
            success: true
        });
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
