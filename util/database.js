// const mysql = require('mysql2');
const mongodb = require('mongodb')


// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'monitor',
//     database: 'node-complete',
//     password: '1234'
// });

// module.exports = pool.promise();

// const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://user2:LTHA8PaU7rYCFzFY@cluster0.l8xmgxg.mongodb.net/?retryWrites=true&w=majority')
        .then( result => {
            console.log('Database connected!')
            _db = result.db('shop')
            // console.log(_db)
            callback();
        })
        .catch( err => {
            console.log(err);
        })
}

 const getdb = () => {
    if (_db){
        console.log('db'+_db);
        return _db;
    }
    throw 'No Database Found';
 };

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
