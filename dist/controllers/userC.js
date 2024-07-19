import sql_pool from '../api/mysql.js';
import bcrypt from 'bcrypt';
export const addUser = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    await sql_pool.query(`
		INSERT INTO users(username, email, password)	
		VALUES(?, ?, ?)`, [user.username, user.email, hash]);
};
export const getUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const row = await sql_pool.query(`
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