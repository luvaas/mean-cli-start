import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserService } from '../_services/user.service';

// Authentication (Using simple authentication via JWT and not anything fancy like OAuth2)
import { AuthService } from '../_services/auth.service';
import { AuthGuard } from '../_guards/auth-guard.service';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		canActivate: [AuthGuard], // Ensures user is authenticated before allowing access to this route
		children: [
			{
				path: '', // This is a component-less route, which makes it easier to guard child routes,
				canActivateChild: [AuthGuard], // Ensures user is authenticated before allowing access to any child route
				children: [
					{ path: 'users', component: ManageUsersComponent },
					// { path: 'resume', component: ManageResumeComponent },
					// { path: 'portfolio', component: ManagePortfolioComponent },
					{ path: '', component: AdminHomeComponent }
				]
			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(adminRoutes)
	],
	exports: [
		RouterModule
	],
	declarations: [
		AdminComponent,
		AdminHomeComponent,
		ManageUsersComponent
	],
	providers: [
		UserService,
		AuthGuard,
		AuthService
	]
})

export class AdminModule { }


