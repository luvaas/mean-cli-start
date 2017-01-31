import * as mongoose from 'mongoose';

export interface IUser {
	_id?		: string,
	email		: string;
	password	: string;
	created		: Date;
	admin		: boolean;
};

const userSchema = new mongoose.Schema({
	email 		: String,
	password 	: String,
	created 	: { type : Date, default : Date.now() },
	admin 		: { type : Boolean, default : false }
});

interface IUserModel extends IUser, mongoose.Document { }

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;

