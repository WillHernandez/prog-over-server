export const isAuthenticated = (req, res, next) => {
	req.session.authorized ? next() : res.sendStatus(401)
}