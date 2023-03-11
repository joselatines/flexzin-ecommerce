import mongoose from 'mongoose';

// todo: hacer lo del stock

interface IProduct {
	title: string;
	id: string;
	price: number;
	qty: number;
	description?: string;
	images: string[];
}

const ProductSchema = new mongoose.Schema<IProduct>({
	title: { type: String, required: true },
	description: { type: String, required: false },
	price: { type: Number, required: true },
	qty: { type: Number, required: true },
	images: { type: [String], required: true },
});

ProductSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export type { IProduct };
export default mongoose.models.Product ||
	mongoose.model('Product', ProductSchema);
