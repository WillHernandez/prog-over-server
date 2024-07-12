import dotenv from 'dotenv';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB
}).promise();
export const addUser = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    await pool.query(`
		INSERT INTO users(username, email, password)	
		VALUES(?, ?, ?)`, [user.username, user.email, hash]);
};
export const getUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const row = await pool.query(`
		SELECT *
		FROM users
		WHERE username = ?`, [username]);
        const passMatch = await bcrypt.compare(password, row[0][0].password);
        if (passMatch) {
            req.session.user = row[0][0];
            req.session.authorized = true;
            req.session.save();
            res.status(200).json({ session: req.session });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (e) {
        res.sendStatus(401);
    }
};
export const signOut = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};
//# sourceMappingURL=userC.js.map