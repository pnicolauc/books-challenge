import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { usersApi } from './api/usersApi';

export const middleware = async (req: NextRequest) => {
  const isAuth = await isAuthenticated(req);
  if (!isAuth) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }

  return NextResponse.next();
}

const isAuthenticated = async (req: NextRequest) => {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');

  if (!authHeader) {
    return false;
  }

  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];

  const loginResult = await usersApi.login(user, pass);

  if(loginResult === null || loginResult.status !== 200) {
    return false;
  }

  return true;
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
