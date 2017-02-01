import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AuthGuard } from './_guards/auth-guard.service';
import { UserComponent } from './manage-users/user/user.component';
import { RoutesModule } from './admin-routes.module';

@NgModule({
	imports: [
		CommonModule,
		RoutesModule,
		FormsModule
	],
	exports: [
		RouterModule
	],
	declarations: [
		AdminComponent,
		AdminHomeComponent,
		ManageUsersComponent,
		UserComponent
	],
	providers: [
		UserService,
		AuthGuard,
		AuthService
	]
})

export class AdminModule { }


