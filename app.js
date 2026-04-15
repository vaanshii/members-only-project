require("dotenv").config();

const express = require("express");
const path = require("node:path");
const passport = require("passport");
const sessionMiddleware = require("./config/session");

require("./config/passport");

const app = express();
const PORT = process.env.PORT;

// routes imports
const { indexRoutes } = require("./routes/indexRoutes");
const { signUpRoute } = require("./routes/signUpRoutes");

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// session and passport middlewares
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/sign-up", signUpRoute);

app.listen(PORT || 3000, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Server running on port ${PORT}`);
});
