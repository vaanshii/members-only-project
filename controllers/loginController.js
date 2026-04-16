const { validatePassword } = require("../utils/passwordUtils");
const User = require("../models/user");
const passport = require("passport");

exports.authenticateUser = passport.authenticate("local", {
	successRedirect: "/success", // redirect to empty route for now
	failureRedirect: "/failed",
});

exports.logoutUser = (req, res, next) => {
	req.logout((error) => {
		if (error) {
			return next(error);
		}
		res.redirect("/");
	});
};
