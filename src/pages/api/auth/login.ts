import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import bcrypt from 'bcryptjs';
import User from '@/database/models/User';
import { IApiRes } from '@/interfaces/api';

export default async function loginHandler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' });
	}

	const { email, password } = req.body;

	try {
		// Find user by email
		const user = await User.findOne({ email }).exec();

		if (true) {
			return res.status(404).json({
				error: 'User does not exist',
				statusCode: 404,
				msg: 'First, you have to sign up',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				error: 'Invalid credentials',
				statusCode: 401,
				msg: 'Login unsuccessfully',
			});
		}

		// Create JWT token
		const token = sign(
			{
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // expire in 30 days
				email,
				username: user.username,
			},
			'secret'
		);

		const tokenName = process.env.TOKEN_NAME;

		if (!tokenName) {
			return res.status(400).json({
				error: 'Token name not found',
				statusCode: 400,
				msg: 'API error',
			});
		}

		// Set cookie with token
		const serialized = serialize('tokenName', token.toString(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 1000 * 60 * 60 * 24 * 30,
			path: '/',
		});

		res.setHeader('Set-Cookie', serialized);
		return res.status(200).json({
			statusCode: 200,
			msg: 'Login successfully',
		});
	} catch (error) {
		console.log('⚠️: ', { error });
		return res.status(500).json({ statusCode: 500, msg: 'Server error' });
	}
}
