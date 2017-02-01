import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { UserService } from '../../../_services/user.service';
import { MessageService } from '../../../_services/message.service';
import { User } from '../../../_models/user';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
	model: User = undefined;
	loading: boolean = false;

	constructor(private route: ActivatedRoute, private router: Router, private service: UserService, private messageService: MessageService) {}

	submit() {
		this.loading = true;

		this.service.update(this.model)
			.subscribe(
				results => {
					console.log('Got results back.  updatedUser = ', results.data);

					this.loading = false;
					this.model = results.data;
					return this.messageService.success(results.info);
				},
				error => {
					this.loading = false;
					return this.messageService.error(error);
				}
			);
	}

	onCancelClick(user: User) {
		this.router.navigate(['/admin/users', { id: user._id }]); // Note that we're passing the current user's ID back to the users page so that we can (optionally) do something with it, like show it as selected on the user management page.
	}

	// TODO:
	// deleteUser(id: string) {
	// 	this.service.delete(id).subscribe(() => { this.getAllUsers(); });
	// }

	ngOnInit() {
		this.route.params
			.switchMap((params: Params) => this.service.getById(params['id']))
			.subscribe((results) => {
				console.log('results:', results);
				this.model = results.data;
			});
	}

}
