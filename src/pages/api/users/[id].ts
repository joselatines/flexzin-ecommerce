import { IApiRes } from '@/interfaces/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/database/models/User';
import dbConnect from '@/database/dbConnection';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	await dbConnect();

	const { method, query, body } = req;
	const { id } = query;

	switch (method) {
		case 'GET':
			try {
				const product = await User.findById(id).lean().exec();

				if (product) {
					res
						.status(200)
						.json({ statusCode: 200, data: product, msg: 'User founded' });
				} else {
					res.status(404).json({ statusCode: 404, msg: 'User not found' });
				}
			} catch (error) {
				console.log('⚠️: ', { error });
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error,
				});
			}
			break;

		case 'PUT':
			try {
				const updatedUser = await User.findByIdAndUpdate(id, body, {
					new: true,
				})
					.lean()
					.exec();

				if (updatedUser) {
					res.status(200).json({
						statusCode: 200,
						data: updatedUser,
						msg: 'User found successfully',
					});
				} else {
					res.status(404).json({ statusCode: 404, msg: 'User not found' });
				}
			} catch (error) {
				console.log('⚠️: ', { error });
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error,
				});
			}
			break;

		case 'DELETE':
			try {
				const deletedProduct = await User.findByIdAndDelete(id).lean().exec();

				if (deletedProduct) {
					res
						.status(200)
						.json({ msg: 'User deleted successfully', statusCode: 200 });
				} else {
					res.status(404).json({ statusCode: 404, msg: 'User not found' });
				}
			} catch (error) {
				console.log('⚠️: ', { error });
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error,
				});
			}
			break;

		default:
			res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' });
			break;
	}
}
