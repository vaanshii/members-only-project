const pool = require("../config/db/pool");

class User {
	static async getByUsername(username) {
		const query = `
            SELECT * FROM users WHERE username = $1;
        `;
		const values = [username];

		try {
			const { rows } = await pool.query(query, values);

			return rows[0];
		} catch (error) {
			console.error("[getByUsername] Query Error: ", error);
			throw error;
		}
	}

	static async getUserById(id) {
		const query = `
            SELECT * FROM users WHERE id = $1;
        `;
		const values = [id];

		try {
			const { rows } = await pool.query(query, values);

			return rows[0];
		} catch (error) {
			console.error("[getById] Query Error: ", error);
			throw error;
		}
	}

	static async createUser(userData, hashedPassword) {
		const { username, firstName, lastName, isMember, isAdmin } = userData;

		const query = `
            INSERT INTO users 
            (username, first_name, last_name, password, is_member, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *;
        `;

		const values = [
			username,
			firstName,
			lastName,
			hashedPassword,
			isMember,
			isAdmin,
		];

		try {
			const { rows } = await pool.query(query, values);
			return rows[0];
		} catch (error) {
			console.error(`[createUser] Query Error: `, error);
			throw error;
		}
	}

	static async deleteById(id) {
		const query = `
            DELETE FROM users WHERE id = $1;
        `;
		const values = [id];

		try {
			const result = await pool.query(query, values);
			console.log(`[deleteById]: Deleted user ${id} successfully.`);
			return result.rowCount > 0;
		} catch (error) {
			console.error("[deleteById] Query Error: ", error);
			throw error;
		}
	}
}

module.exports = User;
