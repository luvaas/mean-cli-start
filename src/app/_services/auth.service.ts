// The authentication service is used to login and logout of the application, to login it posts the users credentials to the api and checks the response for a JWT token, if there is one it means authentication was successful so the user details including the token are added to local storage.
// The logged in user details are stored in local storage so the user will stay logged in if they refresh the browser and also between browser sessions until they logout. If you don't want the user to stay logged in between refreshes or sessions the behaviour could easily be changed by storing user details somewhere less persistent such as session storage or in a property of the authentication service.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	isLoggedIn : boolean = false; // Updated elsewhere but stored here for easy reference
	returnUrl : string; // Store the URL so we can redirect after logging in

	constructor(private http: Http) { }

	login(email: string, password: string) {
		return this.http.post('/api/authenticate', { email: email, password: password })
			.map((response: Response) => {
				let results = response.json();
				return results;
			});
	}

	logout() {
		// Remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.isLoggedIn = false;
	}
}
