// The login component uses the authentication service to login and logout of the application. It automatically logs the user out when it initializes (ngOnInit) so the login page can also be used to logout.

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/message.service';
import log from './helpers/bunyan';

@Component({
	//moduleId: module.id,
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	message : string = '';
	model : any = {};
	loading = false;
	returnUrl : string;

	constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService, private messageService: MessageService ) { }

	setMessage() {
		this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
	}

	login() {
		this.message = 'Trying to log in ...';
		this.loading = true;
		this.authService.login(this.model.email, this.model.password)
			.subscribe(
				results => {
					this.loading = false;

					let user = results.user;

					log.info('results:', results);
					log.info('user:', user);

					if (user && user.token) {
						// Store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify(user));
						this.authService.isLoggedIn = true;
						this.router.navigate([this.returnUrl]);
					}
					else {
						this.authService.isLoggedIn = false;
						this.messageService.error('Invalid email or password.');
					}

					this.setMessage();
				},
				error => {
					this.loading = false;
					this.setMessage();
					this.messageService.error(error);
				}
			);
	}

	logout(next) {
		log.info('logging out');
		this.authService.logout();
		this.setMessage();
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
