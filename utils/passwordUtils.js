const bcrypt = require("bcryptjs");
require("dotenv").config();

async function generatePassword(password) {
	const salt = await bcrypt.genSalt(process.env.SALT);
	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
}

async function validatePassword(plainPassword, storedHashedPassword) {
	const isMatch = await bcrypt.compare(plainPassword, storedHashedPassword);

	return isMatch;
}

module.exports = { generatePassword, validatePassword };
