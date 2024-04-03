import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DB
}).promise()

export const addExcercise = async req => {
	const { name, muscle, link } = req.body
	await pool.query(`
	INSERT INTO excercises (name, primary_muscle, video_link)
	VALUES(?, ?, ?)`, [name, muscle, link]
	)
}

export const addExcerciseNotes = async req => {
	const newNotes = req.body.notes
	const notes = await getExcerciseNotes(req.params.excercise)
	let mergeNotes
	notes[0].notes === null ? mergeNotes = [newNotes] : 
	mergeNotes = [...notes[0].notes, newNotes]

	await pool.query(`
		UPDATE excercises
		SET notes = ?
		WHERE name = ?`, [JSON.stringify(mergeNotes), req.params.excercise]
	)
	const updatedExcercise = await getExcercise(req.params.excercise)
	return updatedExcercise	
}

const getExcerciseNotes = async (excercise) => {
	const rows = await pool.query(`
		SELECT notes FROM excercises
		WHERE name = ?`, [excercise]
	)
	return rows[0]
}

export const getAllExcercises = async () => {
	const rows = await pool.query('SELECT * FROM excercises')
	return rows[0]
}

export const getExcercise = async name => {
	const row = await pool.query(`
	SELECT *
	FROM excercises 
	WHERE name = ?`, [name]
	)
	return row[0][0]
}

export const getExcerciseMuscles = async () => {
	const row = await pool.query(`
	SELECT DISTINCT (primary_muscle)
	FROM excercises`
	)
	return row[0]
}

export const deleteExcercise = async name => {
	await pool.query(`
	DELETE 
	FROM excercises 
	WHERE name = ?`, [name]
	)
	const res = {
		excercise: name,
		status: `${name} DELETED`
	}	
	return res
}

