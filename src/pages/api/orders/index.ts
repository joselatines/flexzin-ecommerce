import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/database/dbConnection';
import { IApiRes } from '@/lib/interfaces/api';
import Product, { IProduct } from '@/database/models/Product';
import Order from '@/database/models/Order';
import mongoose from 'mongoose';
import asyncEvery from '@/lib/utils/asyncEvery';

async function checkPriceInDB(product: IProduct): Promise<boolean> {
	const productDB = await Product.findById(product.id).lean().exec();

	if (!productDB) return false;

	const validPrice = Number(productDB.price) === Number(product.price);
	return validPrice;
}

function calculateTotal(total: number, product: IProduct): number {
	return total + product.price;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IApiRes>
): Promise<void> {
	const { method } = req;
	const { products, ...order } = req.body;

	try {
		await dbConnect();

		switch (method) {
			case 'GET': {
				const all_orders = await Order.find().lean<IProduct>().exec();

				res.status(200).json({
					statusCode: 200,
					data: all_orders,
					msg: 'All items',
				});
				break;
			}

			case 'POST': {
				const allPricesValid = await asyncEvery(products, checkPriceInDB);

				if (!allPricesValid) {
					res.status(400).json({
						statusCode: 400,
						msg: 'Invalid product price(s)',
					});
					return;
				}

				const total_usd = products.reduce(calculateTotal, 0);
				const products_ids = products.map(
					(product: IProduct) => new mongoose.Types.ObjectId(product.id)
				);

				const newOrder = await Order.create({
					...order,
					products_ids,
					total_usd,
				});

				res.status(201).json({
					statusCode: 201,
					data: newOrder,
					msg: 'Order created successfully',
				});
				break;
			}

			default:
				res.status(405).json({
					statusCode: 405,
					msg: 'Method Not Allowed',
				});
				break;
		}
	} catch (error) {
		console.error(`⚠️: ${error}`);

		res.status(500).json({
			statusCode: 500,
			msg: 'Internal Server Error',
			error,
		});
	}
}
