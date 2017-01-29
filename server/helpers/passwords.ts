// Password encryption/decryption with strong bcrypt
import * as Bcrypt from 'bcrypt';

const saltRounds = 10;

let Passwords: any = {};

Passwords.hashPassword = Bcrypt.hash;
Passwords.comparePassword = Bcrypt.compare;

Passwords.getToken = function(next: any) {
	let token = 'mytoken'; // TODO: Generate a token here
	let err = null;
	return next(err, token);
};

export default Passwords;
