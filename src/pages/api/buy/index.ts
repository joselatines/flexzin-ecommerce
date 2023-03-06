import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnection';
import { IApiRes } from '@/interfaces/api';
import Product, { IProduct } from '@/database/models/Product';
import asyncEvery from '@/lib/utils/asyncEvery';
import Order from '@/database/models/Order';

const checkPriceInDB = async (product: IProduct) => {
	const productDB = await Product.findById(product.id).lean().exec();

	if (!productDB) {
		return false;
	}

	return Number(productDB.price) === Number(product.price);
};

const calculateTotal = (total: number, product: IProduct) => {
	return total + product.price;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
) {
	const { method, body } = req;

	const products: IProduct[] = body.products;
	await dbConnect();

	switch (method) {
		case 'POST':
			try {
				const allPricesValid = await asyncEvery(products, checkPriceInDB);

				if (!allPricesValid) {
					return res.status(400).json({
						statusCode: 400,
						msg: 'Invalid product price(s)',
					});
				}

				const total_usd = products.reduce(calculateTotal, 0);				
				const newOrder = await Order.create({ ...body, total_usd });

				res.status(201).json({
					statusCode: 201,
					data: newOrder,
					msg: 'Order in created successfully',
				});
			} catch (error) {
				console.log(`⚠️: ${error}`);

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
