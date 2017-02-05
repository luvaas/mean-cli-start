import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
	selector: 'app-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
	// Instantiate users to an empty array
	error : string;
	jwt : string;
	currentUser : any;
	users : any[] = [];

	constructor(private service: UserService, private router: Router) {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	}

	onUserEditClick(user: any) {
		this.router.navigate(['/admin/user', user._id]); // Mongo uses the ID convention of "._id" instead of ".id"
	}

	// TODO:
	// addUser(user: any) {
	// 	let self = this;
	// 	this.service.create(user, function(err, user) {
	// 		if (err) {
	// 			self.messageService.error(err);
	// 		}
	// 		else {
	// 			self.users.push(user);
	// 		}
	// 	});
	// }

	private getAllUsers() {
		this.service.getAll()
			.subscribe(results => this.users = results.data);
	}

	ngOnInit() {
		this.getAllUsers();
	}
}

