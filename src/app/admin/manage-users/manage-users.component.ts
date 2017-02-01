import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';

@Component({
	selector: 'app-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
	// Instantiate users to an empty array
	error : string;
	jwt : string;
	currentUser : User;
	users : User[] = [];

	constructor(private service: UserService, private router: Router) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	onUserEditClick(user: User) {
		this.router.navigate(['/admin/user', user._id]); // Mongo uses the ID convention of "._id" instead of ".id"
	}

	// TODO:
	// addUser(user: User) {
	// 	this.service.create(user).subscribe(results => this.users.push(results.data));
	// }

	private getAllUsers() {
		this.service.getAll()
			.subscribe(results => this.users = results.data);
	}

	ngOnInit() {
		this.getAllUsers();
	}
}

