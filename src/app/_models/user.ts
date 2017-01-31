// Account for parameters added by Mongoose by extending the model interface (so it can be used by Angular)
import { IUser } from '../../../server/models/user'; // Import the same Interface used by Mongoose in the API server

export interface User extends IUser {
	_id : string;
}
