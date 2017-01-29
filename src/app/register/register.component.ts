import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { MessageService } from '../_services/message.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	model : any = {};
	loading = false;
	returnUrl : string;

	constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService, private messageService: MessageService ) { }

	register() {
		this.loading = true;
		this.authService.register(this.model.email, this.model.password)
			.subscribe(
				results => {

					console.log('got results back.  results:', results);
					this.loading = false;

					let user = results.user;

					console.log('results:', results);
					console.log('user:', user);

					if (user && user.token) {
						// TODO: Store user details and jwt token in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify(user));
						this.authService.isLoggedIn = true;
						this.router.navigate([this.returnUrl]);
					}
					else {
						this.authService.isLoggedIn = false;
						this.messageService.error(results.info);
					}
				},
				error => {
					this.loading = false;
					this.messageService.error(error);
				}
			);
	}

	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams.hasOwnProperty('returnUrl') ? this.route.snapshot.queryParams['returnUrl'] : this.authService.returnUrl ? this.authService.returnUrl : '/admin';
	}
}
