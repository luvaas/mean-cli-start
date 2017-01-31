import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { IUser } from '../../../../server/models/user';


@Component({
	selector: 'app-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
	// Instantiate users to an empty array
	error : string;
	jwt : string;
	currentUser : IUser;
	users : IUser[] = [];

	constructor(private userService: UserService) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	onSubmit() {

	}

	addUser(user: IUser) {
		this.userService.create(user).subscribe(
			newUser => this.users.push(newUser)
		);
	}

	deleteUser(id: number) {
		this.userService.delete(id).subscribe(() => { this.getAllUsers(); });
	}

	private getAllUsers() {
		this.userService.getAll().subscribe(users => { this.users = users; });
	}

	ngOnInit() {
		this.getAllUsers();

	}
}

