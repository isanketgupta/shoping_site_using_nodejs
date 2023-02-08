const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'monitor',
    database: 'node-complete',
    password: '1234'
});

module.exports = pool.promise();
