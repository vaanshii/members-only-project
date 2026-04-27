const pool = require("../config/db/pool");

class Message {
	static async getAllMessages() {
		const query = `
            SELECT 
                messages.id, 
                messages.title, 
                messages.content, 
                messages.created_at, 
                users.username,
				users.motorcycle
            FROM messages
            JOIN users ON messages.user_id = users.id
            ORDER BY messages.created_at DESC;
        `;
		try {
			const { rows } = await pool.query(query);
			return rows;
		} catch (error) {
			console.error("[getAllMessages] Query error: ", error);
		}
	}

	static async addMessage(messageData, userId) {
		const { title, message } = messageData;

		const query = `
            INSERT INTO messages (title, content, user_id)
            VALUES ($1, $2, $3);
        `;
		const values = [title, message, userId];

		try {
			const { rows } = await pool.query(query, values);
			return rows;
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
			const { rows } = await pool.query(query, [username]);
			return rows;
		} catch (error) {
			console.error("[getMessagesByUsername] Query error: ", error);
			throw error;
		}
	}
}

module.exports = Message;
