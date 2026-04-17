const { matchedData, validationResult } = require("express-validator");
const { validateSignUp } = require("../validators/signUpValidator");
const User = require("../models/user");
const { generatePassword } = require("../utils/passwordUtils");

exports.signUpUserPOST = [
	validateSignUp,
	async (req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			return res.status(400).render("index", {
				title: "Home",
				errors: errors.array(),
				formData: req.body,
				openRegister: true,
			});
		}

		const userData = matchedData(req);
		const hashedPassword = await generatePassword(userData.password);

		try {
			const user = await User.createUser(userData, hashedPassword);

			req.login(user, (error) => {
				if (error) {
					console.error("[Login Error]: ", error);
					return next(error);
				}

				return res.redirect("/");
			});
		} catch (error) {
			console.error("[signUpUserPOST] Error: ", error);
			next(error);
		}
	},
];
