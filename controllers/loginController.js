const { validatePassword } = require("../utils/passwordUtils");
const User = require("../models/user");
const passport = require("passport");

exports.authenticateUser = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/",
});

exports.logoutUser = (req, res, next) => {
	req.logout((error) => {
		if (error) {
			return next(error);
		}

		req.session.destroy((err) => {
			if (error) {
				return next(error);
			}

			res.clearCookie("connect.sid", { path: "/" });

			return res.redirect("/");
		});
	});
};
