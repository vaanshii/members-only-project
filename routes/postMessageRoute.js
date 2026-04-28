const { Router } = require("express");
const {
	postMessagePOST,
	deleteMessageDELETE,
} = require("../controllers/postMessageController");

const postMessageRoute = Router();

postMessageRoute.post("/", postMessagePOST);

postMessageRoute.delete("/delete/:id", deleteMessageDELETE);

module.exports = { postMessageRoute };
