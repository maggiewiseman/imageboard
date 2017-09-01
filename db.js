const spicedPg = require('spiced-pg');
const secrets = require('./secrets.json');

const db = spicedPg(`postgres:${secrets.dbUser}:${secrets.pass}@localhost:5432/imageboard`);

function dbQuery(query, data) {
    if(query == 'getAllImages') {
        let queryStr = 'SELECT * from images ORDER BY created_at DESC LIMIT 6';
        return db.query(queryStr).then((result) => {
            console.log('DB getAllImages', result.rows);
            return result.rows;
        });
    }

    if(query == 'getNumImages') {
        let queryStr = 'SELECT COUNT(*) from images';
        return db.query(queryStr).then((result) => {
            console.log(`DB ${query}`, result.rows);
            return result.rows;
        });
    }

    if(query == 'getSomeImages') {
        let queryStr = 'SELECT * from images ORDER BY created_at DESC LIMIT $1 OFFSET $2';
        return db.query(queryStr, data).then((result) => {
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

    if(query == 'updateLikes') {
        console.log(`DBQUERY in ${query}, userData = `, data);
        let queryStr = 'UPDATE images SET likes = $2 WHERE id = $1';
        return db.query(queryStr, data);
    }

    if(query == 'getImage') {
        console.log(`DBQUERY in ${query}, userData = `, data);
        let queryStr = 'SELECT * FROM images WHERE id = $1';
        return db.query(queryStr, data);
    }

    if(query =="getComments") {
        console.log(`DBQUERY in ${query}, userData = `, data);
        let queryStr = 'SELECT * FROM comments WHERE image_id = $1 ORDER BY created_at DESC';
        return db.query(queryStr, data);
    }

    if(query =="addComment") {
        console.log(`DBQUERY in ${query}, userData = `, data);
        let queryStr = 'INSERT INTO comments (image_id, comment, posted_by) VALUES ($1, $2, $3)';
        return db.query(queryStr, data);
    }

    if(query == "getLikes") {
        console.log(`DBQUERY in ${query}, userData = `, data);
        let queryStr = 'SELECT likes from images WHERE id = $1';
        return db.query(queryStr, data);
    }
}


module.exports.dbQuery = dbQuery;

// /*** Tests ***/
// dbQuery('getSomeImages', [6, 6]).then((results)=> {
//     console.log('Test getSomeimage', results);
// }).catch(e => console.error(e.stack));

// dbQuery('addComment', [2, 'practice comment', 'Lizzy Lizard']).then(()=> {
//     console.log('done adding comment');
// }).catch(e => console.error(e.stack));


// dbQuery('getComments', [1]).then((results)=> {
//     console.log('Test get image', results.rows);
// }).catch(e => console.error(e.stack));

//dbQuery('getAllImages');

// dbQuery('saveImage', ['x3hQUsyUdrUfU_g_SvUKw_jt93j6LWMf.png', 'otherfunkychicken', 'other Backbone Tutorial', 'maybe the same Screenshot of backbone tutorial']).then((results)=> {
//     console.log('Test dbQuery', results);
// });
//
// dbQuery('updateLikes', [1, 12]).then((results)=> {
//     console.log('Test dbQuery', results);
// }).catch(e => console.error(e.stack));
