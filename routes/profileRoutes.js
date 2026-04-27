const { Router } = require("express");
const {
	getUserProfileGET,
	editProfileGET,
	updateProfilePOST,
} = require("../controllers/profileController");
const { isAuth } = require("../middleware/authMiddleware");

const profileRouter = Router();

profileRouter.get("/:username", isAuth, getUserProfileGET);

profileRouter.get("/:username/edit", isAuth, editProfileGET);

profileRouter.post("/edit", isAuth, updateProfilePOST);

module.exports = { profileRouter };
