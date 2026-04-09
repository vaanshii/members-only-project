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
		} catch (error) {}
	}
}
