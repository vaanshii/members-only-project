const { Router } = require("express");
const { postMessagePOST } = require("../controllers/postMessageController");

const postMessageRoute = Router();

postMessageRoute.post("/", postMessagePOST);

module.exports = { postMessageRoute };
