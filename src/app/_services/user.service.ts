// The user service contains a standard set of CRUD methods for managing users.

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthHttp, JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserService {
	constructor(private http: Http, private authHttp: AuthHttp) { }

	// NOTE: The user routes to the API server are all protected.  Only admins should have access.
	// Therefore, we are using the authHttp method instead of the usual Http, which will take care of
	// passing the JWT token to the server for us and throw an error if the token doesn't exist.
	// By default, if there is no valid JWT saved, AuthHttp will return an Observable error with 'Invalid JWT'.
	getAll() {
		return this.authHttp.get('/api/users')
			.map((response: Response) => response.json());
	}

	getById(id: string) {
		return this.authHttp.get('/api/users/' + id)
			.map((response: Response) => response.json());
	}

	create(data: any) {
		return this.authHttp.post('/api/users', data)
			.map((response: Response) => response.json());
	}

	update(data: any) {
		return this.authHttp.put('/api/users/' + data._id, data)
			.map((response: Response) => response.json());
	}

	delete(id: string) {
		return this.authHttp.delete('/api/users/' + id)
			.map((response: Response) => response.json());
	}

	// NOTE: This as an example of an unprotected route with no JWT passed
	// create(data: any) {
	// 	return this.http.post('/api/users', data)
	// 		.map((response: Response) => response.json());
	// }
}
