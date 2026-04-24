const pool = require("./pool");

async function initializeSessionTable() {
	const query = `
    CREATE TABLE IF NOT EXISTS "user_sessions" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

    ALTER TABLE "user_sessions" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "user_sessions" ("expire");
    `;

	try {
		await pool.query(query);
		console.log("--user_sessions table initialized--");
	} catch (error) {
		console.error(`[initializeSessionTable] Query error: ${error}`);
	}
}

async function initializeTables() {
	const query = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            motorcycle VARCHAR(255),
            bio TEXT,
            password TEXT NOT NULL,
            is_member BOOLEAN DEFAULT FALSE,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS messages (
            id SERIAL PRIMARY KEY,
            title VARCHAR(50) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        );
    `;

	try {
		await pool.query(query);
		console.log("--user table and messages table has been initialized--");
	} catch (error) {
		console.error(`[initializeTables] Query error: ${error}`);
	}
}

initializeSessionTable();
initializeTables();
