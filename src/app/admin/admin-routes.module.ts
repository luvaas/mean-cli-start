import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

// Import page modules used in this route
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from './_guards/auth-guard.service';
import { UserComponent } from './manage-users/user/user.component';

const routes: Routes = [
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
					{ path: 'user/:id', component: UserComponent },
					{ path: '', component: AdminHomeComponent }
				]
			}
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class RoutesModule { }
