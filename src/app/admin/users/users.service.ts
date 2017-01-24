import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

	constructor(private http: Http) { }

	// Get all users from the API
	getAllUsers() {
		return this.http.get('/api/users')
			.map(function(res){
				console.log('res.json:', res.json());
				return res.json();
			});
	}

	// Add an user
	addUser(data) {
		return this.http.post('/api/users', data)
			.map(res => res.json());
	}
}
