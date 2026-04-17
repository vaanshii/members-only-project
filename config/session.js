const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
require("dotenv").config();

const sessionConfig = {
	store: new pgSession({ pool, tableName: process.env.SESSION_TABLE_NAME }),
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 1000 * 60 * 60 * 24 },
};

module.exports = session(sessionConfig);
