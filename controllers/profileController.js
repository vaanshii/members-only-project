const { formatDistanceToNow } = require("date-fns");

const User = require("../models/user");
const Message = require("../models/message");

async function getUserProfileGET(req, res, next) {
	const username = req.params.username;

	try {
		const userData = await User.getByUsername(username);

		if (!req.isAuthenticated() || userData === undefined) {
			return res.status(404).render("./partials/404", { title: "404" });
		}

		const rawPostMessages = await Message.getMessagesByUsername(username);
		const postMessages = rawPostMessages.map((post) => ({
			...post,
			created_at: formatDistanceToNow(new Date(post.created_at), {
				addSuffix: true,
			}),
		}));

		return res.status(200).render("profile", {
			title: `MotoClub | `,
			userData: userData,
			postMessages: postMessages,
		});
	} catch (error) {
		console.error("[getUserProfileGET] Error: ", error);
		next(error);
	}
}

module.exports = { getUserProfileGET };
