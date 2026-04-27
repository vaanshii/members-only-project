const { body } = require("express-validator");

const emptyValueMsg = "cannot be empty.";
const isAlphaMsg = "must only contain letters.";

const validateEditProfile = [
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
	body("bio")
		.trim()
		.isLength({ min: 2, max: 200 })
		.withMessage("Bio must be between 2 and 200 characters."),
	body("motorcycle")
		.trim()
		.optional()
		.notEmpty()
		.withMessage(`Rider name ${emptyValueMsg}`)
		.bail()
		.isLength({ min: 2, max: 40 })
		.withMessage(`Motorcyle name must be between 2 and 40 characters.`),
];

module.exports = { validateEditProfile };
