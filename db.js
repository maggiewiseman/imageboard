const spicedPg = require('spiced-pg');
const secrets = require('./secrets.json');

const db = spicedPg(`postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/imageboard`);

function dbQuery(query) {
    if(query == 'getAllImages') {
        let queryStr = 'SELECT * from images';
        return db.query(queryStr).then((result) => {
            console.log('DB getAllImages', result.rows);
            return result.rows;
        });
    }
}





module.exports.dbQuery = dbQuery;

/*** Tests ***/

//dbQuery('getAllImages');
