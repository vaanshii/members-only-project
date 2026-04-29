const { tr } = require("date-fns/locale");
const { body } = require("express-validator");
require("dotenv").config();

const membershipValidator = [
	body("passcode")
		.trim()
		.notEmpty()
		.withMessage("Please provide a passcode to be a club member.")
		.isLength({ min: 1, max: 20 })
		.withMessage("Minimum of 1 to 20 characters only.")
		.custom((value) => {
			if (value !== process.env.MEMBERSHIP_SECRET) {
				throw new Error(" Invalid Membership Passcode.");
			}
			return true;
		}),
];

module.exports = { membershipValidator };
