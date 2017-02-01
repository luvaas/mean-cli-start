import * as mongoose from 'mongoose';

export interface IUser {
	email		: string;
	password	: string;
	created		: Date;
	modified 	: Date;
	admin		: boolean;
	first 		: string;
	last 		: string;
};

const userSchema = new mongoose.Schema({
	email 		: String,
	password 	: String,
	created 	: { type : Date, default : Date.now() },
	modified 	: { type : Date, default : Date.now() },
	admin 		: { type : Boolean, default : false },
	first		: String,
	last 		: String
});

interface IUserModel extends IUser, mongoose.Document { }

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
