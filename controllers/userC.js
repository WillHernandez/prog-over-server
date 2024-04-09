import dotenv from 'dotenv'
import mysql from 'mysql2'
import bcrypt	from 'bcrypt'
dotenv.config()

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB
}).promise()

export const addUser = async req => {
	const { username, email, password } = req.body
	const hash = await bcrypt.hash(password, 10)
	await pool.query(`
		INSERT INTO users(username, email, password)	
		VALUES(?, ?, ?)`, [username, email, hash]
	)
}

export const getUser = async req => {
	const { username, password } = req.body
	const row = await pool.query(`
		SELECT *
		FROM users
		WHERE username = ?`, [username]
	)

	const isPassword = await bcrypt.compare(password, row[0][0].password)
	return isPassword
}