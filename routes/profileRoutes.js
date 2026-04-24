const { Router } = require("express");
const { getUserProfileGET } = require("../controllers/profileController");
const { isAuth } = require("../middleware/authMiddleware");

const profileRouter = Router();

profileRouter.get("/:username", isAuth, getUserProfileGET);

module.exports = { profileRouter };
