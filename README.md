# TodoPlus

#Documentation

`npm install && npm start` to run locally on `http://localhost:5000/`
`git push heroku master` to run on heroku hosting

API methods:
GET     `/api/tasks/`        //get all tasks
POST    `/api/tasks/`        //creates a new task
GET     `/api/tasks/{id}`    //get details of a task by id
POST    `/api/tasks/{id}`    //marks a task as done by id
PUT     `/api/tasks/{id}`    //edites a task by id
DELETE  `/api/tasks/{id}`    //deletes a task by id

Database schema:
```
CREATE DATABASE todo;
CREATE TABLE tasks (
    id              SERIAL PRIMARY KEY NOT NULL,
    name            TEXT NOT NULL,
    is_done         BOOLEAN,                    -- marked as done
    priority        SMALLINT,                   -- from 1 to 3
    date            DATE
);
```


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
