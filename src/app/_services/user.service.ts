// The user service contains a standard set of CRUD methods for managing users, it contains a jwt() method that's used to add the JWT token from local storage to the Authorization header of each http request.

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AuthService } from '../_services/auth.service';
import { IUser } from '../../../server/models/user';

@Injectable()
export class UserService {
	constructor(private http: Http, private authService: AuthService) { }

	getAll() {
		return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	create(user: IUser) {
		return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
	}

	update(user: IUser) {
		return this.http.put('/api/users/' + user._id, user, this.jwt()).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
	}

	/***** Utilities *****/

	private jwt() {
		// Add JWT token to all request headers
		let token = this.authService.getToken();
		if (token) {
			let headers = new Headers({ 'Authorization': 'Bearer ' + token });
			return new RequestOptions({ headers: headers });
		}
	}
}
