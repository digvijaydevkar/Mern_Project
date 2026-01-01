const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'dikshant@1410',
    database: 'int_courses'
});
module.exports = pool;
