import mysql from 'mysql2';
const sql_pool = mysql.createPool({
    // host: process.env.MYSQL_HOST,
    // port: 3307,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASS,
    // database: process.env.MYSQL_DB
    host: "host.docker.internal",
    port: 3307,
    user: "root",
    password: "root",
    database: "prog_overload_db"
}).promise();
export default sql_pool;
//# sourceMappingURL=mysql.js.map