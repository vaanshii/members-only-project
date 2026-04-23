const { Router } = require("express");
const { getAllMessagesGET } = require("../controllers/indexController");
const { isAuth } = require("../middleware/authMiddleware");

const indexRoutes = Router();

indexRoutes.get("/", isAuth, getAllMessagesGET);

module.exports = { indexRoutes };
