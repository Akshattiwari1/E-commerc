
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'e_com',
    password: 'Akshat@123',
    port: 5432,
});

pool.connect()
    .then(client => {
        console.log('Connected to the database');
        client.release();
    })
    .catch(err => console.error('Connection error:', err.message));

module.exports = pool;
