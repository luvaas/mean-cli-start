import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UsersService } from '../../_services/users.service';

@Component({
	selector: 'app-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
	// instantiate users to an empty array
	users: any = [];
	error: string;
	jwt: string;
	//decodedJwt: string;
	response: string;
	api: string;

	constructor(private usersService: UsersService, public router: Router, public http: Http) {
		this.jwt = localStorage.getItem('id_token');
		//this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
	}

	onSubmit() {

	}

	getUsers() {
		// Retrieve users from the API
		this.usersService.getAllUsers().subscribe(
			users => this.users = users
		);
	}

	addUser(user) {
		this.usersService.addUser(user).subscribe(
			user => this.users.push(user)
		);
	}

	ngOnInit() {
		this.getUsers();
	}

}
