import mongoose from 'mongoose';

interface ICartItem {
	id: string;
	qty: number;
}

interface IUser {
	email: string;
	id: string;
	username: string;
	password: string;
	cart: ICartItem[];
}

const CartItemSchema = new mongoose.Schema<ICartItem>({
	id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Product',
	},
	qty: { type: Number, default: 1 },
});

const UserSchema = new mongoose.Schema<IUser>({
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
	cart: { type: [CartItemSchema], required: true, default: [] },
});

UserSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export { UserSchema };
export type { IUser };
export default mongoose.models.User || mongoose.model('User', UserSchema);
