import mongoose from 'mongoose';
import { ProductSchema } from './Product';
import { IUser } from './User';

interface IOrder {
	products_ids: string[];
	user_id: IUser;
	total_usd: number;
	payment_method: 'transfer' | 'cash' | 'binance';
	date: string;
}

const OrderSchema = new mongoose.Schema({
	products_ids: [
		{
			type: ProductSchema,
			ref: 'Product',
		},
	],

	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},

	total_usd: {
		type: Number,
		required: true,
	},

	payment_method: {
		type: String,
		required: true,
	},

	date: {
		type: Date,
		default: Date.now,
	},
});

OrderSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export type { IOrder };
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
