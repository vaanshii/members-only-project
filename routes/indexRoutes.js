const { Router } = require("express");
const { getLetterLists } = require("../controllers/indexController");

const indexRoutes = Router();

indexRoutes.get("/", getLetterLists);

module.exports = { indexRoutes };
