/********************************************************
Database Connection Settings
*********************************************************/

// exports.conString = 'postgres://postgres:mysecretpassword@<POSTGRES IP CONTAINER>/crud-node';
var pg = require('pg');
const config = {
	user: 'postgres',
	database: 'YOURDBNAME',
	password: 'YOURPASSWORD',
	port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

module.exports = pool;
