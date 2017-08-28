var express = require('express');
var bodyParser = require('body-parser');
var dbQ = require('./db').dbQuery;

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser').urlencoded({
    extended: false
}));

app.get('/home', (request, response, next)=> {
    return dbQ('getAllImages').then((results)=> {
        console.log('SERVER /home:', results);
        return formatHomeJSON(results);
    }).then((jsonResult)=>{
        res.json(jsonResult);
    }).catch(e => console.log(e.stack));
});


app.listen(process.env.PORT || 8080, () => {
    console.log('listening on port 8080');
});


function formatHomeJSON(rows) {
    //this function is going to return a json object to send in the response
    // 
    // var formattedJsonArr;
    // rows.forEach(function(image) {
    //
    // });
}
