import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	// instantiate users to an empty array
	users: any = [];
	error: string;

	constructor(private usersService: UsersService) { }

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
