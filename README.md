# MEAN-CLI Start

This quick-start app includes the following:

* Angular2
* Angular-CLI
* Express
* Mongoose

... all written in TypeScript!

It also includes the following goodies:
* User management, registration, and login via a basic Admin UI
* User authentication and secure API calls via [JSON Web Tokens](https://jwt.io/introduction/) (JWT) and bcrypt.
* SCSS-based CSS
* [Bootstrap v4](https://v4-alpha.getbootstrap.com/) integration
* Logging via [Bunyan](https://github.com/trentm/node-bunyan)
* Full-fledged Q promises to replace the mpromises from mongoose

Because this app uses a full-fledged Mongo DB and Express it has its own API server for sending data to your Angular 2 app.  No separate server setup required.  If you'd prefer not to use the server for sending DB data to your front-end you can easily repurpose it as a [BFF](https://alexandreesl.com/2016/03/18/backend-for-frontends-a-microservices-pattern/).


#### Attributions

Huge thanks to the following projects and tutorials, upon which this app was built:
* [MEAN Start](https://github.com/cj-wang/mean-start)
* [Token Based Authentication](https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)
* [Angular Docs](https://angular.io/docs/ts/latest/)
* [Angular 2 User Registration and Login Example & Tutorial](http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial)

## Installation

#### Prerequisites

* [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node)
* [MongoDB](https://docs.mongodb.com/manual/installation/)
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

#### Install Global Dependencies:
```bash
npm install -g typescript
npm install -g angular-cli
```

#### Create a new project based on the MEAN-CLI Start

Clone this repo into new project folder (e.g., `my-proj`):
```bash
git clone https://github.com/luvaas/mean-cli-start my-proj
cd my-proj
```

Discard everything "git-like" by deleting the `.git` folder:
```bash
rm -rf .git  # non-Windows
rd .git /S/Q # windows
```

##### Create a new git repo

Initialize this project as a *local git repo* and make the first commit:
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a *remote repository* for this project on the service of your choice.

Grab its address (e.g. *`https://github.com/<my-org>/my-proj.git`*) and push the *local repo* to the *remote*:
```bash
git remote add origin <repo-address>
git push -u origin master
```

#### Install npm packages

Install the npm packages described in the `package.json`:
```bash
npm install
```

## Development server

Your app depends on a Mongo database, so before you can run your app you need to have mongo running first.  Consult the [mongo documentation](https://docs.mongodb.com/manual/) if you're not sure how to do this.

Once your mongo server is running, start the dev server by:
```bash
npm run dev
```

Navigate to [http://localhost:4200/](http://localhost:4200/) to view the app.
Shut it down manually with `Ctrl-C` to kill both the angular-cli server and the express server.

The `npm run dev` script starts 2 servers concurrently:

* **angular-cli dev server** - starts at `http://localhost:4200/`, serving the Angular app.
The Angular app will automatically reload if you change any of the client source files.

* **express server** - starts at `http://localhost:3000/`, serving the REST APIs.
The Express server will be automatically restarted by `nodemon` if you change any of the server source files.

The `angular-cli` dev server is configured to proxy all API calls to `http://localhost:4200/api` to go to the Express server `http://localhost:3000/api`, 
so that the whole app is available at [http://localhost:4200/](http://localhost:4200/).

## Production server
Kick off a production build and start the server:
```bash
npm run prod
```

The `npm run prod` script builds the Angular app using `ng build --prod`, sets `NODE_ENV=production`, and then starts the Express server.  Because the entire Angular app has already been built and we don't need to monitor any files for changes, all we need is to serve the angular packages and provide middlewear for the `/api` routes.  The Express server does this by making everything available on the `:3000` port.

## Creating the First User
Try visiting `http://localhost:4200/admin` in your browser.  Because `admin` is a secured route you will be redirected to the login page.  Since you do not yet have an account, you'll have to create one.  Click the *Register* link to go to the registration page, enter your email address and username, and click the *Create an Account* button.

You should now see an access denied message.  What's going on?

Everything is working exactly as expected!  Yes, you do now have an user account but since all of the admin routes are protected, you can't get in.  In fact, if you were to try hitting the `http://localhost:4200/api/users` route directly in order to see user data, you would get a *401* error (Unauthorized) there too.

In order to access any page in the admin section you have to give yourself admin rights.  To do so, open a terminal and run the mongo CLI:
```bash
mongo api-server
```

Use the mongo CLI to give your new account admin access by entering the following at the prompt (be sure to enter the email address you used to create your account):
```bash
db.users.update({email: "yourname@mailinator.com"}, { $set: {admin: true}});
```

In order to use your new admin privileges, you need to log in again so the API server can send you your new token.  Do this by visiting `http://localhost:4200/admin` one more time.  Enter your new account info at the login screen, hit *Login* button, and BOOM... this time you should see the admin dashboard.  Success.

## Config Files
Rather than hard-coding strings in the Express server files, we make environment-specific values available via config files.  The Express server will load either `server/config/config.development.ts` or `server/config/config.production.ts` based on the environment set by the start script.  Config values common to all environments can be set in `server/config/config.production.ts` and then (optionally) overwritten by setting the same values in `server/config/config.[env].ts`.

## Role-Based Access Control
__TLDR;__ Your password is encrypted in the database using bcrypt.  When you login successfully, the API server sends your browser a JWT (a token).  The JWT is used whenever you attempt to access secured routes or request certain data in order to verify your identity and ensure you have sufficient permissions.  Skip the rest of this section unless you're curious how it all works.

------------

The `admin` section includes its own routes (inside the `admin.module.ts` file) along with a folder called `_guards`.  This design pattern allows us to easily set guards on all of the routes within the admin section to prevent access from unauthorized users.  We use Angular routes with guards to intercept protected routes, redirect users to the login page when necessary, and then use `api/authenticate` to log the user in. 

Bcrypt is used to compare the user's sent password with the bcrypted password hash stored in the database.  If all goes well, the user is logged in successfully.  When the user passes authentication, a JWT (token) is returned from `api/authenticate` and stored in the localstorage of the user's browser. The token contains the entire user object, minus their password, in the token's payload. Thereafter, whenever the user attempts to access a restricted page, two layers of authentication prevent unauthorized access:

- First, Angular uses [auth-guards](https://angular.io/docs/ts/latest/guide/router.html#!#guards) to determine whether or not the user has a JWT.  If so, it decodes the payload of the token on the client to verify that the user has sufficient permissions (i.e., they have the .admin property set on the user object) to access the route in question and, if so, pass them through.
- Just passing a user through to a given secured route is relatively harmless, since that page doesn't have any sensitive data to display until it can fetch the data it needs from the API server.  Therefore, the second layer of protection happens when the client sends the JTW token back to the API server along with its request for data.  The API server looks at the token, makes sure it hasn't expired, and verifies its digital signature using a secret.  Because the token already contains user info and we can verify that the token hasn't been tampered with, we can skip another DB call for the user and send the requested data right away.

All of this work behind the scenes is handled for you. 

The JWT stored on the client is set to expire after 24 hours by default (at which point the user will no longer be considered logged in).  You can change this value in `server/config/config.[env].ts`.  The user will remain logged in until either the token expires or they hit the `login` page (which clears the token).

__NOTE:__ It's important to know that this app is not secured by SSL and cannot use HTTPS as is.  Doing so would require purchasing a certificate and installing it on your API server.  This is highly recommended, though it is beyond the scope of this app.  Without a secure connection with your server, your JWT will be subject to interception by [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) attacks.

While this app is currently only protecting the server/routes/api/user routes by looking for the user.admin property, finer-grained control, including detailed access controls could be provided by implementing something like [express-jwt-permissions](https://github.com/MichielDeMey/express-jwt-permissions).

### Custom API

Add API modules in `server/routes/api/` directory, e.g. `server/routes/api/test.ts`:
```TypeScript
import { Router } from 'express';

const testRouter = Router();

testRouter.get('/test', (req, res) => {
	res.send('Test API works');
});

export default testRouter;
```

All the API modules must have a default export of type `express.Router`.
All routes will be imported by `app.ts` and be added to the Express app automatically.
The root of the Routers correspond to the sub directories starting from `api/`, so the path of above API is `/api/demo/test`.

If you want to secure any given API route, you can follow the example provided by the user routes at `server/routes/api/user.ts`.

### Angular Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

```bash
npm run build
```
The server compiled files will be stored in the `dist/` directory. 
The client build artifacts will be stored in the `dist/public/` directory.
The `dist/` directory is the full distribution of the app.  

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve` (i.e., using `npm run dev`, as above).

## Deploying to AWS Elastic Beanstalk

Prerequisites:
* [AWS Account](https://console.aws.amazon.com/elasticbeanstalk)
* [AWS EB CLI](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

Deploy the app to Elastic Beanstalk:
```bash
eb init --platform node.js --region us-west-2
eb create --instance_type t2.small --sample node-express-env
eb deploy
```

To view your application in the web browser run:
```bash
eb open
```

## Deploying to Google App Engine

Prerequisites:
* [Create GAE Project](https://console.cloud.google.com/projectselector/appengine/create?lang=nodejs&st=true)
* [Google Cloud SDK](https://cloud.google.com/sdk/docs/)

Deploy the app to the App Engine flexible environment:
```bash
gcloud app deploy
```

To view your application in the web browser run:
```bash
gcloud app browse
```

## Thanks To

Special thanks to [MEAN-start](https://github.com/cj-wang/mean-start) for the scaffold project.
