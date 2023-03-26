import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '@/database/models/Product';
import dbConnect from '@/database/dbConnection';
import { IApiRes } from '@/lib/interfaces/api';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	const { method, body } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const products = await Product.find().lean<IProduct>().exec();

				res.status(200).json({
					statusCode: 200,
					data: products,
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
				// IF NOT USD NEITHER BS
				if (body.currency !== 'USD' || body.currency !== 'BS') {
					throw new Error('Currency must be USD or BS');
				}

				const newProduct = await Product.create(body);
				console.log('newProduct: ', newProduct)

				res.status(201).json({
					statusCode: 201,
					data: {
						reviewsCount: Math.floor(Math.random() * 20 + 1),
						...newProduct,
					},
					msg: 'Product created',
				});
			} catch (error) {
				console.error(error);
				res.status(500).json({
					statusCode: 500,
					msg: 'Internal Server Error',
					error: error.errors,
				});
			}
			break;

		default:
			res.status(405).json({ statusCode: 405, msg: 'Method Not Allowed' });
			break;
	}
}
