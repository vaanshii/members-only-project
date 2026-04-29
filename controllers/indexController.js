const Message = require("../models/message");
const { formatDistanceToNow } = require("date-fns");

async function getAllMessagesGET(req, res, next) {
	const rawErrors = req.flash("errors")[0];
	const rawFormData = req.flash("formData")[0];
	const showInput = req.flash("showInput").length > 0;

	try {
		const rawPostMessages = await Message.getAllMessages();
		let postMessages = [];

		if (req.isAuthenticated() && req.user.is_member) {
			postMessages = rawPostMessages.map((post) => ({
				...post,
				created_at: formatDistanceToNow(new Date(post.created_at), {
					addSuffix: true,
				}),
			}));
		} else {
			postMessages = rawPostMessages.map((post) => ({
				...post,
				username: null,
				created_at: null,
			}));
		}

		res.status(200).render("index", {
			title: "MotoClub",
			formData: rawFormData ? JSON.parse(rawFormData) : null,
			errors: rawErrors ? JSON.parse(rawErrors) : [],
			openCreatePost: !!rawErrors,
			postMessages: postMessages,
			showInput: showInput,
		});
	} catch (error) {
		console.error("[getAllMessagesGET] Error: ", error);
		next(error);
	}
}

module.exports = { getAllMessagesGET };
