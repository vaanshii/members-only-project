const session = require("express-session");
require("dotenv").config();
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("../lib/prisma.js");

const sessionConfig = {
	secret: process.env.COOKIE_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { maxAge: 1000 * 60 * 60 * 24 },
	store: new PrismaSessionStore(prisma, {
		checkPeriod: 2 * 60 * 1000,
		dbRecordIdIsSessionId: true,
		dbRecordIdFunction: undefined,
	}),
};

module.exports = session(sessionConfig);
