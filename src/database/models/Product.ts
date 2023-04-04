import mongoose from 'mongoose';

// todo: hacer lo del stock

interface IProduct {
	title: string;
	_id: string;
	price: number;
	salePrice: number;
	rating: number;
	qty: number;
	description?: string;
	images: string[];
	currency: 'USD' | 'BS';
	reviewsCount: number;
}

const ProductSchema = new mongoose.Schema<IProduct>({
	title: { type: String, required: true },
	description: { type: String, required: false },
	price: { type: Number, required: true },
	salePrice: { type: Number, required: true },
	rating: { type: Number, required: true },
	qty: { type: Number, required: true },
	currency: { type: String, required: true },
	images: { type: [String], required: true },
	reviewsCount: { type: Number, required: true, default: 5 },
});

ProductSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject._id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export type { IProduct };
export default mongoose.models.Product ||
	mongoose.model('Product', ProductSchema);
