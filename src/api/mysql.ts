import mysql from 'mysql2'

// Check .env for prev vals
// replace '127.0.0.1' or 'localhost' DB with docker internal host
const sql_pool = mysql.createPool({
	host: "host.docker.internal", 
	port: 3307,
	user: "root",
	password: "root",
	database: "prog_overload_db"
}).promise();

export default sql_pool