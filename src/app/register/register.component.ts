import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/message.service';
import { User } from '../_models/user';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	model : User = undefined;
	loading = false;
	returnUrl : string;

	constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService, private messageService: MessageService ) { }

	submit() {
		this.loading = true;
		this.authService.register(this.model.email, this.model.password)
			.subscribe(
				results => {
					this.loading = false;

					if (this.authService.isLoggedIn()) {
						// Successfully logged in
						return this.router.navigate([this.returnUrl]);
					}
					else {
						// Not able to register and log in user
						return this.messageService.error(results.info);
					}
				},
				error => {
					this.loading = false;
					this.messageService.error(error);
				}
			);
	}

	logout(next) {
		this.authService.logout();
		if (next) { next(); }
	}

	ngOnInit() {
		let self = this;

		this.logout(function() {
			// Get return url from route parameters or authService or default to '/'
			self.returnUrl = self.route.snapshot.queryParams.hasOwnProperty('returnUrl') ? self.route.snapshot.queryParams['returnUrl'] : self.authService.returnUrl ? self.authService.returnUrl : '/admin';
		});
	}
}
