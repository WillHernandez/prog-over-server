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

export const getUser = async (req, res) => {
	const { username, password } = req.body
	const row = await pool.query(`
		SELECT *
		FROM users
		WHERE username = ?`, [username]
	)
	try {
		const passMatch = await bcrypt.compare(password, row[0][0].password)
		passMatch ? res.sendStatus(200) : res.sendStatus(400)
	}catch(e) {
		res.status(400).json(e)
	}
}