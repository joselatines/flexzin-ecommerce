import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import User, { IUser } from '@/database/models/User';
import dbConnect from '@/database/dbConnection';
import { IApiRes } from '@/interfaces/api';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	const { method, body } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const users = await User.find().lean<IUser>().exec();

				res.status(200).json({
					statusCode: 200,
					data: users,
					msg: 'All items',
				});
			} catch (error) {
				console.error(error);
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error,
				});
			}
			break;

		case 'POST':
			try {
				
				const { password } = body;
				const passwordHashed = await bcrypt.hash(password, 10);
				
				const newUser = await User.create({
					...body,
					password: passwordHashed,
				});

				res.status(201).json({
					statusCode: 201,
					data: newUser,
					msg: 'User created',
				});
			} catch (error) {
				console.error({ error });

        // if mongo error
				if (error.code === 11000) {
					// duplicate email error
					res.status(400).json({
						statusCode: 400,
						msg: 'Email already exists',
					});
				} else {
					console.error({ error });
					res.status(500).json({
						statusCode: 500,
						msg: 'Internal Server Error',
						error: error,
					});
				}

			}
			break;

		default:
			res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' });
			break;
	}
}
