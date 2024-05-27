const Pool = require('pg').Pool;

const pool =new Pool({
    user : "postgres",
    host : "localhost",
    database : "samaajData",
    password :  "mynewpassword",
    port : 5432 
}); 

module.exports =pool;