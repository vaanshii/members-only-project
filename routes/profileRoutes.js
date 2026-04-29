const { Router } = require("express");
const {
	getUserProfileGET,
	editProfileGET,
	updateProfilePUT,
	updatePasswordPATCH,
} = require("../controllers/profileController");
const { isAuth } = require("../middleware/authMiddleware");

const profileRouter = Router();

profileRouter.get("/:username", isAuth, getUserProfileGET);

profileRouter.get("/:username/edit", isAuth, editProfileGET);

profileRouter.put("/edit", isAuth, updateProfilePUT);

profileRouter.patch("/edit/password", isAuth, updatePasswordPATCH);

module.exports = { profileRouter };
