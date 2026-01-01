const mysql2 = require('mysql2');

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Digvijay@2005',
    database: 'int_courses'
});
module.exports = pool;
