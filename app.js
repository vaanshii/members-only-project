require("dotenv").config();

const express = require("express");
const path = require("node:path");
const passport = require("passport");
const sessionMiddleware = require("./config/session");
const flash = require("connect-flash");

require("./config/passport");

const app = express();
const PORT = process.env.PORT;

// routes imports
const { indexRoutes } = require("./routes/indexRoutes");
const { signUpRoute } = require("./routes/signUpRoutes");
const { loginRoutes } = require("./routes/loginRoutes");
const { postMessageRoute } = require("./routes/postMessageRoute");
const { profileRouter } = require("./routes/profileRoutes");

// core middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// session and passport middlewares
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", indexRoutes);
app.use("/sign-up", signUpRoute);
app.use("/", loginRoutes);
app.use("/post-message", postMessageRoute);
app.use("/profile", profileRouter);

app.use("/{*splat}", (req, res) => {
	if (req.isAuthenticated()) {
		res.status(404).render("./partials/404", { title: "404" });
	} else {
		res.redirect("/");
	}
});

app.listen(PORT || 3000, (error) => {
	if (error) {
		throw error;
	}
	console.log(`Server running on port ${PORT}`);
});
