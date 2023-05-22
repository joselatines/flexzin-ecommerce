import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
export async function middleware(request: any) {
	const TOKEN_NAME = process.env.TOKEN_NAME;
	if (!TOKEN_NAME) {
		return NextResponse.redirect(new URL('auth/login', request.url));
	}

	const currentPath = request.nextUrl.pathname;

	const jwt = await request.cookies.get(TOKEN_NAME);

	if (!jwt) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}
	// this condition avoid to show the login page if the user is logged in
	if (jwt) {
		if (currentPath.includes('/auth')) {
			// await jwtVerify(jwt, new TextEncoder().encode(TOKEN_NAME));
			return NextResponse.redirect(new URL('/cart', request.url));
		}
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/cart/:path*'],
};
