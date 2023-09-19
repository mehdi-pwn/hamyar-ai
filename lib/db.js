import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  //TODO: Move this data to .env.local for production
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hamyar-ai',
});

export const query = async (sql, params) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(sql, params);
    return rows;
  } finally {
    connection.release();
  }
};