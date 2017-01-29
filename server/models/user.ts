import * as mongoose from 'mongoose';

export interface IUser {
	email		: string;
	password	: string;
	admin		: boolean;
};

const userSchema = new mongoose.Schema({
	email 		: String,
	password 	: String,
	admin 		: { type : Boolean, default : false }
});

interface IUserModel extends IUser, mongoose.Document { }

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;

