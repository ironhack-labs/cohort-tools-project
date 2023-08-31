# Cohort Tools - Client

## About
This is the client side of the Cohort Tools project. It is a React app that uses Vite as a bundler and Tailwind CSS for styling. It is a CRUD app that allows the user to create, read, update, and delete cohorts and students. The app relies on a REST API that handles the application data.


## Features
- User can create a new cohort
- User can view a list of cohorts
- User can view details about a single cohort
- User can edit an existing cohort
- User can delete an existing cohort
- User can add a new student to a cohort
- User can view a list of students in a cohort
- User can view information about a single student
- User can edit information of a single student
- User can delete an existing student
- User can sign up and create a new user account
- User can log in with an existing user account
- User can view details about their profile


## Pages

| Page Name         | Route | Component | Description |
|-------------------|-------|-----------|-------------|
| Dashboard         | [/dashboard](http://localhost:5173/dashboard) | `CohortListPage` | Displays a list of all the cohorts |
| Student List      | [/dashboard](http://localhost:5173/students) | `StudentListPage` | Displays a list of all the students |
| Cohort Details    | [/cohort/:id](http://localhost:5173/cohort/1) | `CohortDetailsPage` | Displays a single cohort details and allows user to create/add new students |
| Edit Cohort       | [/cohort/:id/edit](http://localhost:5173/cohort/1/edit) | `CohortEditPage` | Allows the user to edit or delete a cohort |
| Create Cohort     | [/cohort/create](http://localhost:5173/cohort/create) | `CohortCreatePage` | Allows the user to create a new cohort |
| Student Details   | [/student/:id](http://localhost:5173/student/1) | `StudentDetailsPage` | Displays a single student |
| Edit Student      | [/student/:id/edit](http://localhost:5173/student/1/edit) | `StudentEditPage` | Allows the user to edit or delete a student |
| Sign Up           | [/signup](http://localhost:5173/signup) | `SignupPage` | Allows the user to sign up and create a new user account |
| Log In            | [/login](http://localhost:5173/login) | `LoginPage` | Allows the user to log in with an existing account |
| Profile           | [/profile](http://localhost:5173/profile) | `ProfilePage` | Displays the current user profile information |

<br>

## Getting Started


To get a local copy up and running follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

1. Install dependencies:

```sh
npm install
```

2. Start the application:

```sh
npm run dev
```
<br>


## Technologies Used

This project was built with:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
