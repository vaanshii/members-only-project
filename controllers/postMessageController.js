const { matchedData, validationResult } = require("express-validator");
const { validatePost } = require("../validators/postValidator");
const Message = require("../models/message");

exports.postMessagePOST = [
	validatePost,
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			req.flash("errors", JSON.stringify(errors.array()));
			req.flash("formData", JSON.stringify(req.body));
			return res.redirect("/");
		}

		const postMessageData = matchedData(req);
		const userId = req.user.id;

		try {
			const message = await Message.addMessage(postMessageData, userId);

			res.redirect("/");
		} catch (error) {
			console.error("[postMessagePOST] Error: ", error);
			next(error);
		}
	},
];

exports.deleteMessageDELETE = async (req, res, next) => {
	const postId = req.params.id;
	const currentUserId = req.user.id;
	const redirectUrl = `/profile/${req.user.username}`;

	try {
		const message = await Message.deleteMessage(postId, currentUserId);

		if (message.rowCount === 0) {
			return res.status(403).redirect(redirectUrl);
		}

		return res.redirect(redirectUrl);
	} catch (error) {
		console.error("[deleteMessageDELETE] Error: ", error);
		next(error);
	}
};
