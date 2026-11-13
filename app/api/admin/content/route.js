import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file') || 'blog.json';

    const filePath = path.join(CONTENT_DIR, file);
    const fileData = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(fileData);

    return NextResponse.json({ success: true, data: json });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read content file' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { file, data, password } = body;

    // Simple admin authentication check
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';
    if (password !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!file || !data) {
      return NextResponse.json({ success: false, error: 'Missing file or data' }, { status: 400 });
    }

    const filePath = path.join(CONTENT_DIR, file);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true, message: 'Content saved successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to write content file' }, { status: 500 });
  }
}
