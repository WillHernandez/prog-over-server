import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
}).promise();
export const addExcercise = async (ex) => {
    await pool.query(`
		INSERT INTO excercises (name, primary_muscle, category, video_link)
		VALUES(?, ?, ?, ?)`, [ex.name, ex.muscle, ex.category, ex.link]);
};
export const addExcerciseNotes = async (excercise, newNotes) => {
    const notes = await getExcerciseNotes(excercise);
    let mergeNotes;
    notes[0].notes === null ? mergeNotes = [newNotes] :
        mergeNotes = [...notes[0].notes, newNotes];
    await pool.query(`
		UPDATE excercises
		SET notes = ?
		WHERE name = ?`, [JSON.stringify(mergeNotes), excercise]);
    const updatedExcercise = await getExcercise(excercise);
    return updatedExcercise;
};
const getExcerciseNotes = async (ex) => {
    const rows = await pool.query(`
		SELECT notes FROM excercises
		WHERE name = ?`, [ex]);
    return rows[0];
};
export const deleteExcerciseNote = async (excercise, index) => {
    const notes = await getExcerciseNotes(excercise);
    notes[0].notes.splice(index, 1);
    await pool.query(`
		UPDATE excercises
		SET notes = ?
		WHERE name = ?`, [JSON.stringify(notes[0].notes), excercise]);
    // we can also just return notes[0].notes rather than fetching the notes from our db again but this way confirms it was successfully saved to the db
    const updatedExcercise = await getExcercise(excercise);
    return updatedExcercise;
};
export const getAllExcercises = async () => {
    const rows = await pool.query('SELECT * FROM excercises');
    return rows[0];
};
export const getExcercise = async (excercise) => {
    const row = await pool.query(`
	SELECT *
	FROM excercises 
	WHERE name = ?`, [excercise]);
    return row[0][0];
};
export const getExcerciseCategory = async (category) => {
    const row = await pool.query(`
	SELECT name 
	FROM excercises 
	WHERE category = ?`, [category]);
    return row[0];
};
export const getExcerciseMuscles = async () => {
    const row = await pool.query(`
	SELECT DISTINCT (primary_muscle)
	FROM excercises`);
    return row[0];
};
export const getExcercisesFilter = async (excercises) => {
    const promises = excercises.map(ex => pool.query(`
	SELECT *
	FROM excercises
	WHERE primary_muscle = ?`, [ex.label]));
    const resolve = await Promise.all(promises);
    const filterSqlNesting = resolve.map((ex) => ex[0]);
    const filteredExcercises = [];
    filterSqlNesting.forEach(excercise => {
        excercise.forEach(ex => filteredExcercises.push(ex));
    });
    return filteredExcercises;
};
export const deleteExcercise = async (ex) => {
    await pool.query(`
	DELETE 
	FROM excercises 
	WHERE name = ?`, [ex]);
    const res = { ex, status: `${ex} DELETED` };
    return res;
};
//# sourceMappingURL=excerciseC.js.map