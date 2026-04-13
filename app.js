require("dotenv").config();

const express = require("express");
const passport = require("passport");
const sessionMiddleware = require("./config/session");

require("./config/passport");

const app = express();
const PORT = process.env.PORT;

// routes imports
const { indexRoutes } = require("./routes/indexRoutes");

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session and passport middlewares
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);

app.listen(PORT || 3000, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Server running on port ${PORT}`);
});
