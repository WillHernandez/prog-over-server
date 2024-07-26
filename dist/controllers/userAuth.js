const isAuthenticated = (req, res, next) => {
    req.session.authorized ? next() : res.sendStatus(401);
};
export default isAuthenticated;
//# sourceMappingURL=userAuth.js.map