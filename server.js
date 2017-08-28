var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser').urlencoded({
    extended: false
}));

app.get('/home', (request, response, next)=> {
    db
});


app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port 8080');
});
