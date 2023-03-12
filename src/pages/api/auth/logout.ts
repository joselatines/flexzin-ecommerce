import { IApiRes } from '@/interfaces/api';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function logoutHandler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	const { myTokenName } = req.cookies;
	if (!myTokenName) {
		return res.status(401).json({ statusCode: 202, msg: 'Not logged in' });
	}

	const serialized = serialize('myTokenName', 'null', {
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
