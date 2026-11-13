import { NextResponse } from 'next/server';
import { checkDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const health = await checkDbConnection();

    // Secure verification of env variable presence (never exposing password)
    const configCheck = {
      DB_HOST: process.env.DB_HOST || 'localhost (default)',
      DB_PORT: process.env.DB_PORT || '3306 (default)',
      DB_NAME: process.env.DB_NAME || 'u621127133_tutorproctored (default)',
      DB_USER: process.env.DB_USER || 'u621127133_tutoruser (default)',
      DB_PASSWORD_SET: Boolean(process.env.DB_PASSWORD),
    };

    if (health.connected) {
      return NextResponse.json({
        success: true,
        status: 'healthy',
        message: 'Hostinger MySQL database connected successfully',
        configCheck,
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: 'unhealthy',
          message: configCheck.DB_PASSWORD_SET
            ? `Connection failed: ${health.error || 'Check Hostinger MySQL host/user permissions'}`
            : 'Database connection failed: DB_PASSWORD is missing in Hostinger environment variables.',
          configCheck,
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 'error',
        message: 'Server error testing database connection',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
