const { Router } = require("express");
const {
	verifyMembershipController,
} = require("../controllers/verifyMembershipController");

const verifyMembershipRoute = Router();

verifyMembershipRoute.patch("/", verifyMembershipController);

module.exports = { verifyMembershipRoute };
