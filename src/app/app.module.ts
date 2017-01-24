import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

// Home page
import { HomeComponent } from './home/home.component';
import { MenuService } from './home/menu.service';

// Posts
import { PostsComponent } from './demo/posts/posts.component';
import { PostsService } from './demo/posts/posts.service';

// Admin/users
import { UsersComponent } from './admin/users/users.component';
import { UsersService } from './admin/users/users.service';

// Delete this:
import { HeroFormComponent } from './demo/form/hero-form.component';

const ROUTES = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'posts',
		component: PostsComponent
	},
	{
		path: 'form',
		component: HeroFormComponent
	},
	// Admin section
	{
		path: 'admin/users',
		component: UsersComponent
	}
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PostsComponent,
		HeroFormComponent,
		UsersComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(ROUTES),
		NgbModule.forRoot()
	],
	providers: [
		MenuService,
		PostsService,
		UsersService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
