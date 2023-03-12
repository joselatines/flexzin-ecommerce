import { IApiRes } from '@/interfaces/api';
import type { NextApiRequest, NextApiResponse } from 'next';
import Product from '@/database/models/Product';
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
				const product = await Product.findById(id).lean().exec();

				if (product) {
					res
						.status(200)
						.json({ statusCode: 200, data: product, msg: 'Product founded' });
				} else {
					res.status(404).json({ statusCode: 404, msg: 'Product not found' });
				}
			} catch (error) {
				console.log(error);
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error,
				});
			}
			break;

		case 'PUT':
			try {
				// IF NOT USD NEITHER BS
				if (body.currency !== 'USD' || body.currency !== 'BS') {
					throw new Error('Currency must be USD or BS');
				}

				const updatedProduct = await Product.findByIdAndUpdate(id, body, {
					new: true,
				})
					.lean()
					.exec();

				if (updatedProduct) {
					res.status(200).json({
						statusCode: 200,
						data: updatedProduct,
						msg: 'Product found successfully',
					});
				} else {
					res.status(404).json({ statusCode: 404, msg: 'Product not found' });
				}
			} catch (error) {
				console.log(error);
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error,
				});
			}
			break;

		case 'DELETE':
			try {
				const deletedProduct = await Product.findByIdAndDelete(id)
					.lean()
					.exec();

				if (deletedProduct) {
					res
						.status(200)
						.json({ msg: 'Product deleted successfully', statusCode: 200 });
				} else {
					res.status(404).json({ statusCode: 404, msg: 'Product not found' });
				}
			} catch (error) {
				console.log(error);
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
