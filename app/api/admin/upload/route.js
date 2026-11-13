import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define persistent upload directory
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (err) {
    console.error('[Upload Dir Error]:', err);
  }
}

// GET: List all uploaded media files
export async function GET() {
  try {
    await ensureUploadDir();
    const filenames = await fs.readdir(UPLOAD_DIR);

    const mediaList = [];
    for (const name of filenames) {
      const ext = path.extname(name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        const filePath = path.join(UPLOAD_DIR, name);
        const stats = await fs.stat(filePath);
        mediaList.push({
          filename: name,
          url: `/uploads/${name}`,
          size: stats.size,
          updatedAt: stats.mtime.toISOString(),
        });
      }
    }

    mediaList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    return NextResponse.json({ success: true, media: mediaList });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to read media library' }, { status: 500 });
  }
}

// POST: Upload a new image file
export async function POST(request) {
  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const file = formData.get('file');
    const password = formData.get('password');

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';
    if (password !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!file || typeof file === 'string') {
      return NextResponse.json({ success: false, error: 'No valid file attached' }, { status: 400 });
    }

    // Size limit check
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: 'File size exceeds limit (Max: 5MB)' }, { status: 400 });
    }

    // Extension check
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, error: `Invalid file extension (${ext}). Allowed: ${ALLOWED_EXTENSIONS.join(', ')}` },
        { status: 400 }
      );
    }

    // Sanitize filename to prevent path traversal
    const safeBaseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const timestamp = Date.now();
    const finalFilename = `${safeBaseName}_${timestamp}${ext}`;
    const destinationPath = path.join(UPLOAD_DIR, finalFilename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${finalFilename}`;

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: publicUrl,
      filename: finalFilename,
    });
  } catch (error) {
    console.error('[Upload API Error]:', error);
    return NextResponse.json({ success: false, error: 'File upload failed' }, { status: 500 });
  }
}

// DELETE: Remove an uploaded image file
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    const password = searchParams.get('password');

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin12345';
    if (password !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid password' }, { status: 401 });
    }

    if (!filename) {
      return NextResponse.json({ success: false, error: 'Filename parameter missing' }, { status: 400 });
    }

    // Path traversal check
    const safeFilename = path.basename(filename);
    const filePath = path.join(UPLOAD_DIR, safeFilename);

    await fs.unlink(filePath);

    return NextResponse.json({ success: true, message: 'Image deleted from storage' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete file' }, { status: 500 });
  }
}
