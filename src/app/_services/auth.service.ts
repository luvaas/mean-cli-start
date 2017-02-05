// The authentication service is used to login and logout of the application.
// To login it posts the users credentials to the api and checks the response for a JWT token.
// If there is one it means authentication was successful so the  user details including the token are added to local storage.
// The logged in user details are stored in local storage so the user will stay logged in if they
// refresh the browser and also between browser sessions until they logout. If you don't want the user
// to stay logged in between refreshes or sessions the behavior could easily be changed by storing user
// details somewhere less persistent such as session storage or in a property of the authentication service.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
	jwtHelper : JwtHelper = new JwtHelper();
	returnUrl : string; // Store the URL so we can redirect after logging in

	constructor(private http: Http) { }

	login(email: string, password: string) {
		return this.http.post('/api/authenticate', { email: email, password: password })
			.map((response: Response) => {
				let results = response.json();
				let token = results.data;

				if (results.success && token) {
					this.setToken(token);
				}

				return results;
			});
	}

	logout() {
		// Remove user from local storage to log user out
		localStorage.removeItem('token');
	}

	register(user: any) {
		return this.http.post('/api/register', user)
			.map((response: Response) => {
				let results = response.json();
				let token = results.data;

				if (results.success && token) {
					this.setToken(token);
				}

				return results;
			});
	}

	setToken(token: any) {
		// Store jwt token in local storage to keep user logged in between page refreshes
		localStorage.setItem('token', token);
	}

	isLoggedIn() {
		// Check if token exists and if it is not expired
		return tokenNotExpired('token');
	}

	getCurrentUser() {
		// Get the token from local storage and decode its payload to get the user
		let decodedTokenPayload = this.getDecodedToken();

		return decodedTokenPayload;
	}

	getToken() {
		// Get the jwt token from local storage
		let token = localStorage.getItem('token') || undefined;
		return token;
	}

	private getDecodedToken() {
		// Decode and return the JWT
		let token = this.getToken();

		if (token) {
			let decoded = this.jwtHelper.decodeToken(token);
			return decoded;
		}
		else {
			return undefined;
		};
	}
}

