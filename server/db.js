const Pool = require('pg').Pool;
const password = require('./secrets').password; 

const pool = new Pool({
    user: 'postgres',
    password: password,
    host: 'localhost',
    port: 5432,
    database: 'bet_tracker'
}); 

module.exports = pool;
