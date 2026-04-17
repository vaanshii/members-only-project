const { validatePassword } = require("../utils/passwordUtils");
const User = require("../models/user");
const passport = require("passport");

exports.authenticateUser = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return next(err);
		}

		if (!user) {
			return res.status(401).render("index", {
				title: "Home",
				errors: [{ msg: "Invalid username or password" }],
				formData: req.body,
				openLogin: true,
			});
		}

		req.login(user, (err) => {
			if (err) return next(err);
			return res.redirect("/");
		});
	})(req, res, next);
};

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
