# API Documentation

This documentation provides an overview of the available routes and data models for the Cohort Tools API.

Throughout the project, you should use this documentation as a reference and a guide. Refer to it whenever you need information or more details on how to implement the routes or model your database.


## Routes

In this section, you will find detailed information about the different routes available in the API.
The API offers a variety of routes to work with *cohort* and *student* documents. Each route is associated with a specific HTTP verb and URL, allowing you to perform CRUD (Create, Read, Update, and Delete) actions on the data.

<br>

#### Cohort routes

| HTTP verb | URL                        | Request body | Action                                 |
| --------- | -------------------------- | ------------ | -------------------------------------- |
| GET       | `/api/cohorts`             | (empty)      | Returns all the cohorts in JSON format |
| GET       | `/api/cohorts/:cohortId`   | (empty)      | Returns the specified cohort by id     |
| POST      | `/api/cohorts`             | JSON         | Creates a new cohort                   |
| PUT       | `/api/cohorts/:cohortId`   | JSON         | Updates the specified cohort by id     |
| DELETE    | `/api/cohorts/:cohortId`   | (empty)      | Deletes the specified cohort by id     |


<br>

#### Student routes

| HTTP verb | URL                               | Request body | Action                                                         |
| --------- | --------------------------------- | ------------ | -------------------------------------------------------------- |
| GET       | `/api/students/cohort/:cohortId`  | (empty)      | Returns all the students of a specified cohort in JSON format  |
| GET       | `/api/students/:studentId`        | (empty)      | Returns the specified student by id                            |
| POST      | `/api/students`                   | JSON         | Creates a new student **with their respective cohort id**      |
| PUT       | `/api/students/:studentId`        | JSON         | Updates the specified student by id                            |
| DELETE    | `/api/students/:studentId`        | (empty)      | Deletes the specified cohort by id                             |


<hr>

<br>

## Models

The *Models* section holds information about the data models for your database. It outlines the structure of the documents in the database, providing you with a clear understanding of how your data should be organized.

<br>

#### Cohort Model

```js
// We intentionally left this section unfinished because we want you to actively participate in the process.
// As you start working on your database, you'll need to define the data models to practice structuring your database data (data modeling).
// The purpose of this section will become clearer as you progress in your project.
```

<br>

#### Student Model

```js
// We intentionally left this section unfinished because we want you to actively participate in the process.
// As you start working on your database, you'll need to define the data models to practice structuring your database data (data modeling).
// The purpose of this section will become clearer as you progress in your project.
```

<br>

### Mock JSON Data (❗TEMPORARY - REMOVE AFTER MODELING THE DATABASE)


At the beginning stage of the project, before you integrate a database into your project, you will be working with mock JSON data. For this purpose, we have provided you with the two JSON files located in the `server/` folder:

###### `cohorts.json`
```js
[
  {
    "_id": 1,
    "inProgress": false,
    "cohortSlug": "ft-wd-paris-2023-07-03",
    "cohortName": "FT WD PARIS 2023 07",
    "program": "Web Dev",
    "campus": "Paris",
    "startDate": "2023-07-03T00:00:00.000Z",
    "endDate": "2023-09-08T00:00:00.000Z",
    "programManager": "Sally Daher",
    "leadTeacher": "Florian Aube",
    "totalHours": 360
  },
  // Additional data...
]
```

<br>

###### `students.json`
```js
[
  {
    "firstName": "Christine",
    "lastName": "Clayton",
    "email": "christine.clayton@example.com",
    "phone": "567-890-1234",
    "linkedinUrl": "https://linkedin.com/in/christineclaytonexample",
    "languages": ["English", "Dutch"],
    "program": "Web Dev",
    "background": "Computer Engineering",
    "image": "https://i.imgur.com/r8bo8u7.png",
    "cohort": 1,
    "projects": []
  },
  // Additional data...
]
```

<br>

❗You should use this mock data as a reference as you start modeling your database. **Once you've completed the database modeling** process, remember to **remove this section from the README file**.
