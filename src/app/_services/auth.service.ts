// The authentication service is used to login and logout of the application.  To login it posts the users credentials to the api and checks the response for a JWT token, if there is one it means authentication was successful so the user details including the token are added to local storage.
// The logged in user details are stored in local storage so the user will stay logged in if they refresh the browser and also between browser sessions until they logout. If you don't want the user to stay logged in between refreshes or sessions the behaviour could easily be changed by storing user details somewhere less persistent such as session storage or in a property of the authentication service.

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

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

	register(email: string, password: string) {
		return this.http.post('/api/register', { email: email, password: password })
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
		localStorage.setItem('token', JSON.stringify(token));
	}

	isLoggedIn() {
		let token = this.getToken();
		let isTokenValid = this.getTokenValid(token);

		// TODO: decode JWT and make sure it's not expired
		return isTokenValid ? true : false; // If there is token in local storage, they are logged in.
	}

	getCurrentUser() {
		// Get the token from local storage and decode its payload to get the user
		let decodedTokenPayload = this.getDecodedToken();

		return decodedTokenPayload;
	}

	getToken() {
		// Get the jwt token from local storage
		return JSON.parse(localStorage.getItem('token')) || undefined;
	}

	private getDecodedToken() {
		// Decode and return the JWT
		let jwt_decode = require('jwt-decode');
		let token = this.getToken();

		if (token) {
			let decoded = jwt_decode(token);

			return decoded;
		}
		else {
			return undefined;
		};
	}

	private getTokenValid(token) {
		// Check the expiration date of the token to make sure it's still validif(decodedToken.exp < dateNow.getTime())
		if (!token) { return false; };

		let now = new Date();
		let decodedToken = this.getDecodedToken();
		let isValid = (decodedToken.exp < now.getTime()) ? true : false;

		return isValid;
	}
}
