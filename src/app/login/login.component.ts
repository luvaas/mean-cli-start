// The login component uses the authentication service to login and logout of the application. It automatically logs the user out when it initializes (ngOnInit) so the login page can also be used to logout.

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/message.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	model : any = {};
	loading = false;
	returnUrl : string;

	constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService, private messageService: MessageService ) { }

	submit() {
		this.loading = true;
		return this.authService.login(this.model.email, this.model.password)
			.subscribe(
				results => {
					this.loading = false;

					if (this.authService.isLoggedIn()) {
						// Successfully logged in
						return this.router.navigate([this.returnUrl]);
					}
					else {
						// Not able to log in user
						return this.messageService.error(results.info);
					}
				},
				error => {
					this.loading = false;
					return this.messageService.error(error);
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
