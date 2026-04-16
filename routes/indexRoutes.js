const { Router } = require("express");
const { getAllMessages } = require("../controllers/indexController");
const { isAuth } = require("../middleware/authMiddleware");

const indexRoutes = Router();

indexRoutes.get("/", isAuth, getAllMessages);

module.exports = { indexRoutes };
