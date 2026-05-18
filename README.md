# API Documentation

This documentation provides an overview of the available routes and data models for the Cohort Tools API.

Throughout the project, you should use this documentation as a reference and a guide. Refer to it whenever you need information or more details on how to implement the routes or model your database.

<br>

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
| GET       | `/api/students`                   | (empty)      | Returns all the students in JSON format                        |
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

| Field          | Data Type        | Description                                 |
|----------------|------------------|---------------------------------------------|
| `cohortSlug`     | *`String`*           | Unique identifier for the cohort. Required. |
| `cohortName`     | *`String`*           | Name of the cohort. Required.              |
| `program`        | *`String`*           | Program/course name. Allowed values: "Web Dev", "UX/UI", "Data Analytics", "Cybersecurity". |
| `format`         | *`String`*           | Format of the cohort. Allowed values: "Full Time", "Part Time". |
| `campus`         | *`String`*           | Campus location. Allowed values: "Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote". |
| `startDate`      | *`Date`*             | Start date of the cohort. Default: Current date. |
| `endDate`        | *`Date`*             | End date of the cohort.                     |
| `inProgress`     | *`Boolean`*          | Indicates if the cohort is currently in progress. Default: false. |
| `programManager` | *`String`*           | Name of the program manager. Required.      |
| `leadTeacher`    | *`String`*           | Name of the lead teacher. Required.         |
| `totalHours`     | *`Number`*           | Total hours of the cohort program. Default: 360. |


<br>

#### Student Model

| Field        | Data Type                            | Description                                  |
|--------------|--------------------------------------|----------------------------------------------|
| `firstName`    | *`String`*                               | First name of the student. Required.        |
| `lastName`     | *`String`*                               | Last name of the student. Required.         |
| `email`        | *`String`*                               | Email address of the student. Required, unique. |
| `phone`        | *`String`*                               | Phone number of the student. Required.      |
| `linkedinUrl`  | *`String`*                               | URL to the student's LinkedIn profile. Default: Empty string. |
| `languages`    | *`Array`* of Strings                     | Spoken languages of the student. Allowed values: "English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other". |
| `program`      | *`String`*                               | Type of program the student is enrolled in. Allowed values: "Web Dev", "UX/UI", "Data Analytics", "Cybersecurity". |
| `background`   | *`String`*                               | Background information about the student. Default: Empty. |
| `image`        | *`String`*                               | URL to the student's profile image. Default: https://i.imgur.com/r8bo8u7.png . |
| `cohort`       | *`ObjectId`*,                            | Reference *_id* of the cohort the student belongs to. |
| `projects`     | *`Array`*                                | Array of the student's projects.   |


<br>

