import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuService } from './home/menu.service';
import { AdminModule } from './admin/admin.module'; // Admin section has its own child routes and imports
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MessageComponent } from './_directives/message/message.component';
import { MessageService } from './_services/message.service';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RoutesModule } from './app-routes';
import { AuthModule } from './_services/auth.module';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		PageNotFoundComponent,
		LoginComponent,
		MessageComponent,
		RegisterComponent,
		ForbiddenComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AdminModule,
		AuthModule,
		NgbModule.forRoot(),
		RoutesModule
	],
	providers: [
		MenuService,
		MessageService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
