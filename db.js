const spicedPg = require('spiced-pg');
const secrets = require('./secrets.json');

const db = spicedPg(`postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/imageboard`);

function dbQuery(query, data) {
    if(query == 'getAllImages') {
        let queryStr = 'SELECT * from images';
        return db.query(queryStr).then((result) => {
            console.log('DB getAllImages', result.rows);
            return result.rows;
        });
    }

    if(query == 'saveImage') {
        let queryStr = 'INSERT INTO images (image, username, title, description) VALUES ($1, $2, $3, $4);';
        return db.query(queryStr, data).then((result) => {
            console.log('DB save Images', result.rows);
            return result.rows;
        });
    }
}


module.exports.dbQuery = dbQuery;

/*** Tests ***/

//dbQuery('getAllImages');

// dbQuery('saveImage', ['x3hQUsyUdrUfU_g_SvUKw_jt93j6LWMf.png', 'otherfunkychicken', 'other Backbone Tutorial', 'maybe the same Screenshot of backbone tutorial']).then((results)=> {
//     console.log('Test dbQuery', results);
// });
