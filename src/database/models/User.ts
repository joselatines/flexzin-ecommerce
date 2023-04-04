import mongoose, { Document } from 'mongoose';

interface ICartItem extends Document {
	id: string;
	qty: number;
}

interface IUser extends Document {
	email: string;
	id: string;
	username: string;
	password: string;
	cart: ICartItem[];
}

const cartItemSchema = new mongoose.Schema<ICartItem>({
	_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Product',
	},
	qty: { type: Number, default: 1 },
});

const userSchema = new mongoose.Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cart: { type: [cartItemSchema], required: true, default: [] },
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (document, returnedObject) => {
		returnedObject._id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export { userSchema };
export type { IUser };
export default mongoose.models.User ||
	mongoose.model<IUser>('User', userSchema);
