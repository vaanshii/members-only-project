const { matchedData, validationResult } = require("express-validator");
const { validateSignUp } = require("../validators/signUpValidator");

exports.signUpUserPOST = [
	validateSignUp,
	(req, res) => {
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
	},
];
