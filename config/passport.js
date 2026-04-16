const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const { validatePassword } = require("../utils/passwordUtils");

const verifyCallback = async (username, password, done) => {
	try {
		const user = await User.getByUsername(username);

		if (!user) {
			return done(null, false);
		}

		const isValid = await validatePassword(password, user.password);
		if (!isValid) {
			return done(null, false);
		}

		return done(null, user);
	} catch (error) {
		console.error("[verifyCallback] Unexpected Error: ", error);
		done(error);
	}
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.getUserById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});
