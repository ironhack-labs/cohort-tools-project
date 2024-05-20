\*\*\*\*# API Documentation

This documentation provides an overview of the available routes and data models for the Cohort Tools API.

Throughout the project, you should use this documentation as a reference and a guide. Refer to it whenever you need information or more details on how to implement the routes or model your database.

<br>

## Routes

In this section, you will find detailed information about the different routes available in the API.
The API offers a variety of routes to work with _cohort_ and _student_ documents. Each route is associated with a specific HTTP verb and URL, allowing you to perform CRUD (Create, Read, Update, and Delete) actions on the data.

<br>

#### Cohort routes

| HTTP verb | URL                      | Request body | Action                                 |
| --------- | ------------------------ | ------------ | -------------------------------------- |
| GET       | `/api/cohorts`           | (empty)      | Returns all the cohorts in JSON format |
| GET       | `/api/cohorts/:cohortId` | (empty)      | Returns the specified cohort by id     |
| POST      | `/api/cohorts`           | JSON         | Creates a new cohort                   |
| PUT       | `/api/cohorts/:cohortId` | JSON         | Updates the specified cohort by id     |
| DELETE    | `/api/cohorts/:cohortId` | (empty)      | Deletes the specified cohort by id     |

<br>

#### Student routes

| HTTP verb | URL                              | Request body | Action                                                        |
| --------- | -------------------------------- | ------------ | ------------------------------------------------------------- |
| GET       | `/api/students`                  | (empty)      | Returns all the students in JSON format                       |
| GET       | `/api/students/cohort/:cohortId` | (empty)      | Returns all the students of a specified cohort in JSON format |
| GET       | `/api/students/:studentId`       | (empty)      | Returns the specified student by id                           |
| POST      | `/api/students`                  | JSON         | Creates a new student **with their respective cohort id**     |
| PUT       | `/api/students/:studentId`       | JSON         | Updates the specified student by id                           |
| DELETE    | `/api/students/:studentId`       | (empty)      | Deletes the specified cohort by id                            |

<hr>

<br>

## Models

The _Models_ section holds information about the data models for your database. It outlines the structure of the documents in the database, providing you with a clear understanding of how your data should be organized.

<br>

#### Cohort Model

| Field            | Data Type   | Description                                                                                                          |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| `cohortSlug`     | _`String`_  | Unique identifier for the cohort. Required.                                                                          |
| `cohortName`     | _`String`_  | Name of the cohort. Required.                                                                                        |
| `program`        | _`String`_  | Program/course name. Allowed values: "Web Dev", "UX/UI", "Data Analytics", "Cybersecurity".                          |
| `format`         | _`String`_  | Format of the cohort. Allowed values: "Full Time", "Part Time".                                                      |
| `campus`         | _`String`_  | Campus location. Allowed values: "Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "Lisbon", "Remote". |
| `startDate`      | _`Date`_    | Start date of the cohort. Default: Current date.                                                                     |
| `endDate`        | _`Date`_    | End date of the cohort.                                                                                              |
| `inProgress`     | _`Boolean`_ | Indicates if the cohort is currently in progress. Default: false.                                                    |
| `programManager` | _`String`_  | Name of the program manager. Required.                                                                               |
| `leadTeacher`    | _`String`_  | Name of the lead teacher. Required.                                                                                  |
| `totalHours`     | _`Number`_  | Total hours of the cohort program. Default: 360.                                                                     |

<br>

#### Student Model

| Field         | Data Type            | Description                                                                                                                |
| ------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `firstName`   | _`String`_           | First name of the student. Required.                                                                                       |
| `lastName`    | _`String`_           | Last name of the student. Required.                                                                                        |
| `email`       | _`String`_           | Email address of the student. Required, unique.                                                                            |
| `phone`       | _`String`_           | Phone number of the student. Required.                                                                                     |
| `linkedinUrl` | _`String`_           | URL to the student's LinkedIn profile. Default: Empty string.                                                              |
| `l**anguages` | _`Array`_ of Strings | Spoken languages of the student. Allowed values: "English", "Spanish", "French", "German", "Portuguese", "Dutch", "Other". |
| `program`     | _`String`_           | Type of program the student is enrolled in. Allowed values: "Web Dev", "UX/UI", "Data Analytics", "Cybersecurity".         |
| `background`  | _`String`_           | Background information about the student. Default: Empty.                                                                  |
| `image`       | _`String`_           | URL to the student's profile image. Default: https://i.imgur.com/r8bo8u7.png .                                             |
| `cohort`      | _`ObjectId`_,        | Reference _\_id_ of the cohort the student belongs to.                                                                     |
| `projects`    | _`Array`_            | Array of the student's projects.                                                                                           |

<br>
**
