function isAuth(req, res, next) {
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
		res.locals.isAuthenticated = true;
		console.log(req.user);
	} else {
		res.locals.user = null;
		res.locals.isAuthenticated = false;
	}
	next();
}

module.exports = { isAuth };
