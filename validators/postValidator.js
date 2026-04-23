const { body } = require("express-validator");

const validatePost = [
	body("title")
		.trim()
		.notEmpty()
		.withMessage("Must provide a headline or title.")
		.bail()
		.isLength({ min: 3, max: 30 })
		.withMessage("Minimum characters of 3, and maximum of 30."),
	body("message")
		.trim()
		.notEmpty()
		.withMessage("Field cannot be empty.")
		.bail()
		.isLength({ min: 3, max: 5000 })
		.withMessage("Minimum of 3 characters."),
];

module.exports = { validatePost };
