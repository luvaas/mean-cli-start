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

// Admin section (it has its own child routes and imports)
import { AdminModule } from './admin/admin.module';

// Misc
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessageComponent } from './_directives/message/message.component';
import { MessageService } from './_services/message.service';

const ROUTES = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	// 404
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PageNotFoundComponent,
		LoginComponent,
		MessageComponent
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
		MessageService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
