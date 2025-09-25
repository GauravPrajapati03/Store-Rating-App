import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.DB_name,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log(`DB Connected Successfully`);

        await conn.query('SELECT 1');
        conn.release();
    } catch (err) {
        console.log(`Error Connecting to DB, `, err.message);
    }
}

testConnection();

export default pool;