import { IApiRes } from '@/interfaces/api';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function logoutHandler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	if (req.method !== 'GET') {
		return res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' });
	}
	const myTokenName = req.cookies;

	const currentTokenName = process.env.TOKEN_NAME;

	if (!myTokenName) {
		return res.status(401).json({ statusCode: 202, msg: 'Not logged in' });
	}

	if (!currentTokenName) {
		return res
			.status(404)
			.json({ statusCode: 404, msg: 'Token name not found' });
	}

	const serialized = serialize('fullAccesFlexzin', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: 0,
		path: '/',
	});

	res.setHeader('Set-Cookie', serialized);
	return res.status(200).json({
		statusCode: 200,
		msg: 'Logout successful',
	});
}
