const { prisma } = require("../lib/prisma.js");

class User {
	static async getByUsername(username) {
		try {
			const user = await prisma.users.findUnique({
				where: { username: username },
			});

			return user;
		} catch (error) {
			console.error("[getByUsername] Query Error: ", error);
			throw error;
		}
	}

	static async getUserById(id) {
		try {
			const user = await prisma.users.findUnique({
				where: { id: id },
			});

			return user;
		} catch (error) {
			console.error("[getById] Query Error: ", error);
			throw error;
		}
	}

	static async createUser(userData, hashedPassword) {
		const { username, firstName, lastName, isMember, isAdmin } = userData;

		try {
			const user = await prisma.users.create({
				data: {
					username: username,
					password: hashedPassword,
					first_name: firstName,
					last_name: lastName,
					is_member: isMember,
					is_admin: isAdmin,
				},
			});

			return user;
		} catch (error) {
			console.error(`[createUser] Query Error: `, error);
			throw error;
		}
	}

	static async deleteById(id) {
		try {
			const result = await prisma.users.delete({
				where: { id: id },
			});
			return result;
		} catch (error) {
			console.error("[deleteById] Query Error: ", error);
			throw error;
		}
	}

	static async updateInfoByUsername(userData, username) {
		const { firstName, lastName, motorcycle, bio } = userData;

		try {
			const user = await prisma.users.update({
				where: { username: username },
				data: {
					first_name: firstName,
					last_name: lastName,
					motorcycle: motorcycle,
					bio: bio,
				},
			});

			return user;
		} catch (error) {
			console.error("[updateInfoByUsername] Query Error: ", error);
			throw error;
		}
	}

	static async updateMembershipStatus(userId) {
		try {
			const result = await prisma.users.update({
				where: { id: userId },
				data: {
					is_member: true,
				},
			});

			return result;
		} catch (error) {
			console.error("[updateMembershipStatus] Query Error: ", error);
			throw error;
		}
	}

	static async updatePassword(userId, newPassword) {
		try {
			await prisma.users.update({
				where: { id: userId },
				data: {
					password: newPassword,
				},
			});
		} catch (error) {
			console.error("[updatePassword] Query Error: ", error);
			throw error;
		}
	}
}

module.exports = User;
