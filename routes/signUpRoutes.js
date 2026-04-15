const { Router } = require("express");
const { signUpUserPOST } = require("../controllers/signUpController");

const signUpRoute = Router();

signUpRoute.post("/", signUpUserPOST);

module.exports = { signUpRoute };
