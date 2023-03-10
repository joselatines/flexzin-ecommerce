import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: any) {
	const tokenName = process.env.TOKEN_NAME;

	if (!tokenName) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	const jwt = request.cookies.get(tokenName);
	
	console.log('jwt: ', jwt);


	if (!jwt) return NextResponse.redirect(new URL('/login', request.url));

	// this condition avoid to show the login page if the user is logged in
	if (jwt) {
		if (request.nextUrl.pathname.includes('/login')) {
			try {
				await jwtVerify(jwt, new TextEncoder().encode('secret'));
				return NextResponse.redirect(new URL('/cart', request.url));
			} catch (error) {
				return NextResponse.next();
			}
		}
	}

	try {
		const { payload } = await jwtVerify(
			jwt,
			new TextEncoder().encode('secret')
		);
		console.log({ payload });
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export const config = {
	matcher: ['/cart/:path*'],
};
