import mongoose from 'mongoose';

interface IUser {
	email: string;
	id: string;
	username: string;
	password: string;
}

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
});

UserSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;

		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

export { UserSchema };
export type { IUser };
export default mongoose.models.User || mongoose.model('User', UserSchema);
