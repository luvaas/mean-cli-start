// We use this to create a return an AuthHttp instance with the options you would like to change from the defaults used by angular2-jwt
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	let tokenName: string = 'token';
	return new AuthHttp(new AuthConfig({
		tokenName: tokenName,
		// headerName: 'Authorization',  // Uses 'Authorization' by default
		// headerPrefix: 'Bearer', // Uses 'Bearer' by default
		// tokenGetter: (() => sessionStorage.getItem('token')) // Uses localStorage by default
		// globalHeaders: [{'Content-Type':'application/json'}], // Set as many global headers as you like by passing an array of header-shaped objects to globalHeaders
		// noJwtError: true // By default, if there is no valid JWT saved, AuthHttp will return an Observable error with 'Invalid JWT'. If you would like to continue with an unauthenticated request instead, set noJwtError to true.
	}), http, options);
}

@NgModule({
	providers: [
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		}
	]
})
export class AuthModule { }
