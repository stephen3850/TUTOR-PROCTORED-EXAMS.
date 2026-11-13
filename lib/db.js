import mysql from 'mysql2/promise';

/**
 * Server-Only MySQL Database Connection Pool
 * Hostinger MySQL Connection Configuration
 * NEVER expose DB_PASSWORD or database credentials to client-side code!
 */

// Global pool instance to prevent multiple connection pools during Next.js development hot-reloads
let pool;

export function getDbPool() {
  if (!pool) {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = parseInt(process.env.DB_PORT || '3306', 10);
    const dbName = process.env.DB_NAME || 'u621127133_tutorproctored';
    const dbUser = process.env.DB_USER || 'u621127133_tutoruser';
    const dbPassword = process.env.DB_PASSWORD || '';

    pool = mysql.createPool({
      host: dbHost,
      port: dbPort,
      database: dbName,
      user: dbUser,
      password: dbPassword,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000, // 10s connection timeout
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }

  return pool;
}

/**
 * Safe database query helper function with automatic connection management
 */
export async function dbQuery(sql, params = []) {
  try {
    const db = getDbPool();
    const [rows, fields] = await db.execute(sql, params);
    return { success: true, rows, fields };
  } catch (error) {
    // Log error safely without exposing passwords or credentials
    console.error('[Database Query Error]:', error.message || 'MySQL Query Execution Failed');
    throw new Error('Database query execution error');
  }
}

/**
 * Health check helper function to test database connectivity
 */
export async function checkDbConnection() {
  try {
    const db = getDbPool();
    const connection = await db.getConnection();
    await connection.ping();
    connection.release();
    return { connected: true };
  } catch (error) {
    console.error('[Database Connection Failed]:', error.message || 'Hostinger MySQL Connection Error');
    return { connected: false, error: error.message };
  }
}
