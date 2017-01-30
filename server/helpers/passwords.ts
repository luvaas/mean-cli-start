// Password encryption/decryption with strong bcrypt
import * as Bcrypt from 'bcrypt';
import config from './config';

let Passwords: any = {};

Passwords.hashPassword = function(plainTextPassword: string) {
	return Bcrypt.hash(plainTextPassword, config.saltRounds); // Returns a promise
};

Passwords.comparePassword = function(plainTextPassword: string, hash: string){
	return Bcrypt.compare(plainTextPassword, hash); // Returns a promise
};

Passwords.getToken = function(next: any) {
	// TODO: generate a token and return a promise
	let token = 'mytoken';
	let err = null;
	return next(err, token);
};

export default Passwords;