const { prisma } = require("../lib/prisma.js");

class Message {
	static async getAllMessages() {
		try {
			const rawData = await prisma.messages.findMany({
				orderBy: {
					created_at: "desc",
				},
				select: {
					id: true,
					title: true,
					content: true,
					created_at: true,
					users: {
						select: {
							username: true,
							motorcycle: true,
						},
					},
				},
			});

			const data = rawData.map((dt) => ({
				id: dt.id,
				title: dt.title,
				content: dt.content,
				created_at: dt.created_at,
				username: dt.users.username,
				motorcycle: dt.users.motorcycle,
			}));

			return data;
		} catch (error) {
			console.error("[getAllMessages] Query error: ", error);
		}
	}

	static async addMessage(messageData, userId) {
		const { title, message } = messageData;

		try {
			const newMessage = await prisma.messages.create({
				data: {
					title: title,
					content: message,
					user_id: userId,
				},
			});

			return newMessage;
		} catch (error) {
			console.error("[addMessage] Query error: ", error);
			throw error;
		}
	}

	static async getMessagesByUsername(username) {
		const query = `
			SELECT 
                messages.id, 
                messages.title, 
                messages.content, 
                messages.created_at, 
                users.username
            FROM messages
            JOIN users ON messages.user_id = users.id
			WHERE users.username = $1
            ORDER BY messages.created_at DESC;`;

		try {
			const rawMessages = await prisma.messages.findMany({
				where: { users: { username: username } },
				select: {
					id: true,
					title: true,
					content: true,
					created_at: true,
					users: {
						select: {
							username: true,
							motorcycle: true,
						},
					},
				},
			});

			const userMessage = rawMessages.map((msg) => ({
				id: msg.id,
				title: msg.title,
				content: msg.content,
				created_at: msg.created_at,
				username: msg.users.username,
				motorcycle: msg.users.motorcycle,
			}));

			return userMessage;
		} catch (error) {
			console.error("[getMessagesByUsername] Query error: ", error);
			throw error;
		}
	}

	static async getUserIdFromMessageId(postMessageId) {
		try {
			const userId = await prisma.messages.findUnique({
				where: { id: parseInt(postMessageId) },
				select: {
					user_id: true,
				},
			});
			console.log("GETUSEID", userId);

			return userId.user_id;
		} catch (error) {
			console.error("[getUserIdFromMessageId] Query error: ", error);
			throw error;
		}
	}

	static async deleteMessage(postId, userId) {
		try {
			const result = await prisma.messages.delete({
				where: { id: parseInt(postId), user_id: userId },
			});

			return result;
		} catch (error) {
			console.error("[deleteMessage] Query error: ", error);
			throw error;
		}
	}
}

module.exports = Message;
