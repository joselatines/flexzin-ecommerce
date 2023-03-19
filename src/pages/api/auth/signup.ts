import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User from '@/database/models/User';
import { IApiRes } from '@/lib/interfaces/api';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' });
	}
	const { email, password, username } = req.body;

	try {
		if (email.length < 8 || password.length < 8 || username.length < 3) {
			return res.status(401).json({
				error: 'Invalid credentials',
				statusCode: 401,
				msg: 'The fields should be at least 8 characters long',
			});
		}

		const existingUser = await User.findOne({ email }).exec();

		if (existingUser) {
			return res.status(302).json({
				statusCode: 302,
				msg: 'User already exists, please login',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			email,
			password: hashedPassword,
			username,
		});

		return res.status(201).json({
			statusCode: 201,
			data: newUser,
			msg: 'User signed up successfully',
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			statusCode: 500,
			msg: 'Server error',
		});
	}
}
