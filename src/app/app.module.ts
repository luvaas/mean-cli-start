import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Main app component
import { AppComponent } from './app.component';

// Home page
import { HomeComponent } from './home/home.component';
import { MenuService } from './home/menu.service';

// Posts
import { PostsComponent } from './demo/posts/posts.component';
import { PostsService } from './demo/posts/posts.service';

// Admin section (it has its own child routes and imports)
import { AdminModule } from './admin/admin.module';

// Misc
import { LoginComponent } from './login/login.component';

// Delete this:
import { HeroFormComponent } from './demo/form/hero-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const ROUTES = [
	{ path: '', component: HomeComponent },
	{ path: 'posts', component: PostsComponent },
	{ path: 'form', component: HeroFormComponent },
	{ path: 'login', component: LoginComponent },
	// 404
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PostsComponent,
		HeroFormComponent,
		PageNotFoundComponent,
		LoginComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AdminModule,
		RouterModule.forRoot(ROUTES),
		NgbModule.forRoot()
	],
	providers: [
		MenuService,
		PostsService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
