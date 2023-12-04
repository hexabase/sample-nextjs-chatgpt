import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIES_KEY } from './common/constants/cookie';
import { APP_ROUTES } from './common/constants/routes';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const access_token = cookieStore.get(COOKIES_KEY.ACCESS_TOKEN)
  const res = NextResponse.next();

  if(!access_token && request.nextUrl.pathname !== APP_ROUTES.LOGIN ){
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, request.url))
  }
  return res
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}