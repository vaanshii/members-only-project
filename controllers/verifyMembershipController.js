require("dotenv").config();
const { validationResult, matchedData } = require("express-validator");
const User = require("../models/user");
const { membershipValidator } = require("../validators/membershipValidator");

exports.verifyMembershipController = [
	membershipValidator,
	async (req, res, next) => {
		const userId = req.user.id;
		const membershipSecretCode = process.env.MEMBERSHIP_SECRET;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash("errors", JSON.stringify(errors.array()));
			req.flash("showInput", "true");
			return res.redirect("/");
		}

		const userInput = matchedData(req);
		console.log(userInput);

		if (userInput.passcode !== process.env.MEMBERSHIP_SECRET) {
			return;
		}

		try {
			const response = await User.updateMembershipStatus(userId);
			console.log(response);

			return res.redirect("/");
		} catch (error) {
			console.error("[verifyMembershipController] Error: ", error);
			next(error);
		}
	},
];
