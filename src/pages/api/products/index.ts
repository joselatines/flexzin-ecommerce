import { NextApiRequest, NextApiResponse } from 'next';
import Product, { IProduct } from '@/database/models/Product';
import dbConnect from '@/database/dbConnection';
import { IApiRes } from '@/lib/interfaces/api';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	const { method, body } = req;

	const db = await dbConnect();
	console.log(db)
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
				if (body.currency !== 'USD' && body.currency !== 'BS') {
					res.status(400).json({
						statusCode: 400,
						msg: 'Currency must be USD or BS',
					});
				}

				const newProduct = await Product.create(body);
				console.log('newProduct: ', newProduct);

				res.status(201).json({
					statusCode: 201,
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
