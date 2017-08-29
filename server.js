var express = require('express');
var bodyParser = require('body-parser');
var dbQ = require('./db').dbQuery;
var urlPrepend = require('./config.json');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser').urlencoded({
    extended: false
}));

app.get('/home', (req, res, next)=> {
    return dbQ('getAllImages').then((results)=> {
        //console.log('SERVER /home:', results);
        var images = {images: formatHomeJSON(results)};
        console.log("images: ", images);
        res.json(images);
        //res.json(formatHomeJSON(results));
    }).catch(e => console.log(e.stack));
});

app.post('', (req, res) => {
    return dbQ('updateImage')
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
