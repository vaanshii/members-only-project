const { body } = require("express-validator");
const { validatePassword } = require("../utils/passwordUtils");

const validateUpdatePassword = [
	body("currentPassword")
		.trim()
		.notEmpty()
		.withMessage("Provide your current password")
		.custom(async (password, { req }) => {
			const savedPassword = req.user.password;

			const isMatch = await validatePassword(password, savedPassword);

			if (isMatch) {
				return true;
			}

			throw new Error("Current password do not match");
		}),
	body("newPassword")
		.trim()
		.notEmpty()
		.withMessage("Please provide your new password")
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
		.bail()
		.custom((value, { req }) => {
			if (value !== req.body.newPassword) {
				throw new Error("Password do not match.");
			}
			return true;
		}),
];

module.exports = { validateUpdatePassword };
