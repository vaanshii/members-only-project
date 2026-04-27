const { formatDistanceToNow } = require("date-fns");
const { validationResult, matchedData } = require("express-validator");

const User = require("../models/user");
const Message = require("../models/message");
const { validateEditProfile } = require("../validators/editProfileValidator");

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

async function editProfileGET(req, res, next) {
	const username = req.params.username;

	try {
		const userData = await User.getByUsername(username);

		if (!req.isAuthenticated() || userData === undefined) {
			return res.status(404).render("./partials/404", { title: "404" });
		}

		const user = {
			firstName: userData.first_name,
			lastName: userData.last_name,
			motorcycle: userData.motorcycle,
			bio: userData.bio,
		};

		return res
			.status(200)
			.render("editProfile", { errors: [], formData: user });
	} catch (error) {
		console.error("[editProfileGET] Error: ", error);
		next(error);
	}

	return res.render("editProfile");
}

const updateProfilePOST = [
	validateEditProfile,
	async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res
				.status(401)
				.render("editProfile", { errors: errors.array(), formData: req.body });
		}

		const userData = matchedData(req);
		const username = req.user.username;

		try {
			const user = await User.updateInfoByUsername(userData, username);
			res.redirect(`/profile/${username}`);
		} catch (error) {
			console.error("[updateProfilePOST] Error: ", error);
			next(error);
		}
	},
];

module.exports = { getUserProfileGET, editProfileGET, updateProfilePOST };
