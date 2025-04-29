const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'airbnb_db',
    port: 3306, // not compulsory 
    connectionLimit: 10, // not compulsory 
})
module.exports = {
    pool,
}