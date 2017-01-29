// Password encryption/decryption with strong bcrypt
import * as Bcrypt from 'bcrypt';

const saltRounds = 10;

let Passwords: any = {};

Passwords.hashPassword = function(plainTextPassword: string) {
	return Bcrypt.hash(plainTextPassword, saltRounds); // Returns a promise
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
