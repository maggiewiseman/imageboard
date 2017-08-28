var express = require('express');
var bodyParser = require('bodyParser');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser);

app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port 8080');
});
