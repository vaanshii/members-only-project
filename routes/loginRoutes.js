const { Router } = require("express");
const loginRoutes = Router();

const {
	authenticateUser,
	logoutUser,
} = require("../controllers/loginController");

loginRoutes.post("/login", authenticateUser);
loginRoutes.get("/logout", logoutUser);

module.exports = { loginRoutes };
