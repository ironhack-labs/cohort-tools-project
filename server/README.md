# API Documentation

This documentation provides an overview of the available routes and data models for the Cohort Tools API.

Throughout the project, you should use this documentation will as a reference and a guide. Consult it whenever you need information or guidance on how to implement the routes or model your database.

## Routes

In this section, you will find detailed information about the different routes available in the API.
The API offers a variety of routes to work with *cohort* and *student* documents. Each route is associated with a specific HTTP verb and URL, allowing you to perform CRUD (Create, Read, Update, and Delete) actions on the data.

#### Cohort routes

| HTTP verb | URL                        | Request body | Action                                 |
| --------- | -------------------------- | ------------ | -------------------------------------- |
| GET       | `/api/cohorts`             | (empty)      | Returns all the cohorts in JSON format |
| GET       | `/api/cohorts/:cohortId`   | (empty)      | Returns the specified cohort by id     |
| POST      | `/api/cohorts`             | JSON         | Creates a new cohort                   |
| PUT       | `/api/cohorts/:cohortId`   | JSON         | Updates the specified cohort by id     |
| DELETE    | `/api/cohorts/:cohortId`   | (empty)      | Deletes the specified cohort by id     |



#### Student routes

| HTTP verb | URL                               | Request body | Action                                                         |
| --------- | --------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/students/cohort/:cohortId`  | (empty)      | Returns all the students of a specified cohort in JSON format  |
| GET       | `/api/students/:studentId`        | (empty)      | Returns the specified student by id                            |
| POST      | `/api/students`                   | JSON         | Creates a new student **with their respective cohort id**      |
| PUT       | `/api/students/:studentId`        | JSON         | Updates the specified student by id                            |
| DELETE    | `/api/students/:studentId`        | (empty)      | Deletes the specified cohort by id                             |


<hr>

## Models

The *Models* section holds information about the data models for your database. It outlines the structure of the documents in the database, providing you with a clear understanding of how your data should be organized.

> 

##### Cohort Model

```js
// We intentionally left this section unfinished because we want you to actively participate in the process.
// As you start working on your database, you'll need to define the data models to practice structuring your database data (data modeling).
// The purpose of this section will become clearer as you progress in your project.
```

##### Student Model

```js
// We intentionally left this section unfinished because we want you to actively participate in the process.
// As you start working on your database, you'll need to define the data models to practice structuring your database data (data modeling).
// The purpose of this section will become clearer as you progress in your project.
```
