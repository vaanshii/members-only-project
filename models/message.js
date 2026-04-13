const pool = require("../config/db/pool");

class Message {
	static async getAllMessages() {
		const query = `
            SELECT 
                messages.id, 
                messages.title, 
                messages.content, 
                messages.created_at, 
                users.username
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

	static async addMessage(title, content, userId) {
		const query = `
            INSERT INTO messages (title, content, user_id)
            VALUES ($1, $2, $3);
        `;
		const values = [title, content, userId];

		try {
			const { rows } = await pool.query(query, values);
			return rows;
		} catch (error) {
			console.error("[addMessage] Query error: ", error);
			throw error;
		}
	}
}
