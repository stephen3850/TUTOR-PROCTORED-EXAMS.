import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get('provider');

    const clientId = process.env.GITHUB_CLIENT_ID;

    if (!clientId) {
      return new NextResponse(
        'Missing GITHUB_CLIENT_ID environment variable. Please set GITHUB_CLIENT_ID in Hostinger environment variables.',
        { status: 500 }
      );
    }

    if (provider === 'github') {
      const redirectUri = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
      return NextResponse.redirect(redirectUri);
    }

    return new NextResponse('Unsupported provider', { status: 400 });
  } catch (error) {
    return new NextResponse('Authentication error', { status: 500 });
  }
}
