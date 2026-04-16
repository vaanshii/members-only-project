const { body } = require("express-validator");

const emptyValueMsg = "cannot be empty.";
const isAlphaMsg = "must only contain letters.";

const validateSignUp = [
	body("username")
		.trim()
		.notEmpty()
		.withMessage(`Rider name ${emptyValueMsg}`)
		.bail()
		.isLength({ min: 6, max: 40 })
		.withMessage(`Rider name must be between 6 and 40 characters.`),
	body("firstName")
		.trim()
		.notEmpty()
		.withMessage(`First name ${emptyValueMsg}`)
		.bail()
		.isAlpha("en-US", { ignore: " " })
		.withMessage(`First name ${isAlphaMsg}`)
		.isLength({ min: 2, max: 30 })
		.withMessage(`First name must be between 2 and 30 characters.`),
	body("lastName")
		.trim()
		.notEmpty()
		.withMessage(`First name ${emptyValueMsg}`)
		.bail()
		.isAlpha("en-US", { ignore: " " })
		.withMessage(`First name ${isAlphaMsg}`)
		.isLength({ min: 2, max: 30 })
		.withMessage(`First name must be between 2 and 30 characters.`),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Please provide a password")
		.bail()
		.isLength({ min: 8 })
		.withMessage("At least 8 characters")
		.bail()
		.matches(/[A-Z]/)
		.withMessage("At least one uppercase letter")
		.bail()
		.matches(/[a-z]/)
		.withMessage("At least one lowercase letter")
		.bail()
		.matches(/[0-9]/)
		.withMessage("At least one number")
		.bail()
		.matches(/[\W_]/)
		.withMessage("At least one special character"),
	body("confirmPassword")
		.trim()
		.notEmpty()
		.withMessage("Please re-enter your password")
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Password do not match.");
			}
			return true;
		}),
];

module.exports = { validateSignUp };
