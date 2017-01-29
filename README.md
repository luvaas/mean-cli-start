# MEAN Start CLI

This quick-start app includes the following:

* Angular2
* Angular-CLI
* Express
* Mongoose

... all written in TypeScript!

It also includes the following goodies:
* User management, registration, and login via a basic Admin UI
* User authentication and secure API calls via [JSON Web Tokens](https://jwt.io/introduction/) (JWT)
* SCSS-based CSS
* [Bootstrap v4](https://v4-alpha.getbootstrap.com/) integration
* Logging via [Bunyan](https://github.com/trentm/node-bunyan)

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
```
bash
npm install -g typescript
npm install -g angular-cli
```

#### Create a new project based on the MEAN Start

Clone this repo into new project folder (e.g., `my-proj`):
```bash
git clone https://github.com/luvaas/mean-start-cli my-proj
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
```
bash
npm install
```

## Development server
Start the dev server:
```
bash
npm run dev
```

Navigate to [http://localhost:4200/](http://localhost:4200/) for the app.
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
```
bash
npm run prod
```

The `npm run prod` script builds the Angular app using `ng build --prod`, sets `NODE_ENV=production`, and then starts the Express server.  Because the entire Angular app has already been built and we don't need to monitor any files for changes, all we need is to serve the angular packages and provide middlewear for the `/api` routes.  The Express server does this by making everything available on the `:3000` port.

## Config Files
Rather than hard-coding strings in the Express server files, we make environment-specific values available via config files.  The Express server will load either `server/config/config.development.ts` or `server/config/config.production.ts` based on the environment set by the start script.  Config values common to all environments can be set in `server/config/config.production.ts`. 

## Develop

Model classes in `server/models/` directory are exposed as REST APIs by default.
E.g. with the `User` model added, below REST APIs are created automatically:
* POST    /api/users           - Create a User
* GET     /api/users           - Get all the users
* GET     /api/users/:user_id  - Get a single user
* PUT     /api/users/:user_id  - Update a user with new info
* DELETE  /api/users/:user_id  - Delete a user

>TODO: Role-based access control required.

### Custom API

Add API modules in `server/routes/api/` directory, e.g. `server/routes/api/demo/test.ts`:
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

>TODO: Role-based access control required.

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

## Deploying to Heroku

## Thanks To

Special thanks to [MEAN-start](https://github.com/cj-wang/mean-start) for the scaffold project.
