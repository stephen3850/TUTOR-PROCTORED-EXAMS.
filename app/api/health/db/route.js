import { NextResponse } from 'next/server';
import { checkDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const health = await checkDbConnection();

    if (health.connected) {
      return NextResponse.json({
        success: true,
        status: 'healthy',
        message: 'Hostinger MySQL database connected successfully',
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          status: 'unhealthy',
          message: 'Database connection failed. Ensure DB_PASSWORD is correctly set in Hostinger environment variables.',
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
