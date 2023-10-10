import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

export const query = async (sql, params) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(sql, params);
    return rows;
  } catch (e) {
    console.log("SQL CONNECTION ERR: " + e);
  } finally {
    connection.release();
  }
};
