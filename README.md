# user-dashboard-app

User dashboard template created using MEAN stack.

See live demo at Heroku https://user-dashboard-app.herokuapp.com/ with test account username: `tester`, password: `123456`



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need to have following software installed to run this project locally.

```
Node.js
MongoDB
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:
```
git clone https://github.com/leevilehtonen/user-dashboard-app.git
```

In the cloned repository folder:
```
npm install
npm start
```
This will get project running

### Front-end for development purpose

If you want to start developing the frontend, instead of using the built on in the public folder. In the cloned repository, change to angular-src and start the development server for angular:
```
cd angular-src
npm install
ng serve
```
NOTE: To do the backend api requests you need have the backend also running and you need to check from the authentication service right paths for HTTP requests.

### Build frontend and run

When you are ready developing the frontend. In the angular-src folder build the src to backend's public folder and run the backend:
```
ng build // in angular-src folder
cd .. // back to repos root folder
npm start
```


## Running the tests

Backend tests: TODO

Frontend tests (limited), run at `angluar-src` folder:
```
ng test
```


## Deployment

There is currently a demo running at [Heroku](https://user-dashboard-app.herokuapp.com/) which is connected to a free mLab MongoDB database.

You can also deploy this to web, for example Heroku (See instructions at Heroku website). To connect the database, you need to pass environment variable `MONGODB_URI` which holds the URI of the database. Also you can pass your own `SECRET` environment variable which will be used for JWT secret.


## Built With

* [Node.js](https://nodejs.org/en/) - Javascript runtime for backend
* [Express](https://expressjs.com/) - Web application framework
* [Mongoose](http://mongoosejs.com/) - Elegant mongodb object modeling
* [Angular-cli](https://cli.angular.io/) - Frontend development platform

Rest of the dependencies can be found in package.json files

## Authors

* **[Leevi](https://github.com/leevilehtonen)** - *Initial work*

## License

This project is licensed under the MIT License

