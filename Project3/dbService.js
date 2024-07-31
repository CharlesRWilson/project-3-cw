const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function saveFavorite(userId, cardData) {
    const client = await pool.connect();
    try {
        await client.query('INSERT INTO favorites (user_id, card_data) VALUES ($1, $2)', [userId, cardData]);
    } finally {
        client.release();
    }
}

async function getFavorites(userId) {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT card_data FROM favorites WHERE user_id = $1', [userId]);
        return res.rows.map(row => row.card_data);
    } finally {
        client.release();
    }
}