import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		// The ActivatedRouteSnapshot contains the future route that will be activated and the RouterStateSnapshot contains the future RouterState of the application, should the user pass through the guard check.
		let url: string = state.url;

		return this.checkHasAccess(url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(route, state);
	}

	checkHasAccess(url: string): boolean {
		// Verify whether or not the user has sufficient access for the route

		let isLoggedIn = this.authService.isLoggedIn();
		let currentUser = this.authService.getCurrentUser();

		if (isLoggedIn){
			// The user is logged in

			if (currentUser.admin) {
				// The user is logged in and they have admin rights
				return true;
			}
			else {
				// The user is logged in but they do not have sufficient permission to access the page.

				// Navigate to the forbidden page with extras
				this.router.navigate(['/forbidden']);
			}
		}
		else {
			// Otherwise, redirect the user to the login page

			// Store the attempted URL for redirecting
			this.authService.returnUrl = url;

			// Navigate to the login page with extras
			this.router.navigate(['/login']);
			return false;
		}
	}
}

