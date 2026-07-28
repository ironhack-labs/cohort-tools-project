# Cohort Tools API — Route Tests (Insomnia)

Manual test checklist for all 11 CRUD routes, plus intentional-failure cases. Use with Insomnia (or Postman/Thunder Client — same requests, different app).

**Setup:** create a collection called "Cohort Tools API" with two folders, "Cohorts" and "Students." Server must be running locally (`npm run dev` from `server/`) and MongoDB must be connected and seeded (`cohorts`/`students` collections populated).

Base URL: `http://localhost:5005`

---

## Cohorts

### 1. GET all cohorts
```
GET /api/cohorts
```
**Expect:** `200`, JSON array of cohorts. Copy an `_id` from the response for tests 2, 4, 5.

Optional — test the query filters used by the client's Cohort list page:
```
GET /api/cohorts?campus=Paris
GET /api/cohorts?program=Web+Dev
```

### 2. GET one cohort by id
```
GET /api/cohorts/<cohortId>
```
**Expect:** `200`, single cohort object. If the id doesn't exist: `404`.

### 3. POST create a cohort
```
POST /api/cohorts
Body (JSON):
{
  "cohortSlug": "ft-wd-remote-2026-08",
  "cohortName": "FT WD REMOTE 2026",
  "program": "Web Dev",
  "format": "Full Time",
  "campus": "Remote",
  "programManager": "Test Manager",
  "leadTeacher": "Test Teacher"
}
```
**Expect:** `201`, new cohort with a fresh `_id` and defaults filled in (`inProgress: false`, `totalHours: 360`, `startDate` = today).

### 4. PUT update a cohort
```
PUT /api/cohorts/<cohortId>
Body (JSON):
{ "totalHours": 400, "inProgress": true }
```
**Expect:** `200`, updated cohort reflecting the new values.

### 5. DELETE a cohort
```
DELETE /api/cohorts/<cohortId>
```
**Expect:** `200`, `{ "message": "Cohort deleted" }`. Re-running test 2 with the same id afterward should return `404`.

---

## Students

### 6. GET all students
```
GET /api/students
```
**Expect:** `200`, array of students. Each student's `cohort` field must be a **full cohort object** (name, campus, etc.), not just an id string — that confirms `.populate("cohort")` is working. Copy a `studentId` and `cohortId` from here for the next tests.

### 7. GET students of one cohort
```
GET /api/students/cohort/<cohortId>
```
**Expect:** `200`, only students belonging to that cohort, each with `cohort` populated.

### 8. GET one student by id
```
GET /api/students/<studentId>
```
**Expect:** `200`, one student, `cohort` populated. `404` if the id doesn't exist.

### 9. POST create a student
```
POST /api/students
Body (JSON):
{
  "firstName": "Test",
  "lastName": "Student",
  "email": "test.student@example.com",
  "phone": "555-000-1111",
  "languages": ["English"],
  "program": "Web Dev",
  "cohort": "<a real cohortId>"
}
```
**Expect:** `201`, new student with defaults filled in (`linkedinUrl: ""`, default `image`, `projects: []`). ⚠️ `cohort` must be a real 24-character ObjectId copied from a `GET /api/cohorts` response — not the literal placeholder text.

### 10. PUT update a student
```
PUT /api/students/<studentId>
Body (JSON):
{ "background": "Career changer" }
```
**Expect:** `200`, updated student.

### 11. DELETE a student
```
DELETE /api/students/<studentId>
```
**Expect:** `200`, `{ "message": "Student deleted" }`.

---

## Intentional-failure tests (just as important as the happy path)

These confirm your validation and error handling work — not optional, this is part of what gets graded.

### 12. Invalid enum value
```
POST /api/cohorts
Body:
{ "cohortSlug": "x", "cohortName": "x", "program": "Basket Weaving", "programManager": "x", "leadTeacher": "x" }
```
**Expect:** an error response (not `201`), and the server should **not** crash — check the terminal for a clean `catch` message, not a raw stack trace.

### 13. Duplicate email
```
POST /api/students
Body: { ...same email as an existing student... }
```
**Expect:** an error — the `unique: true` constraint on `email` should reject it.

### 14. Malformed id (invalid ObjectId format)
```
GET /api/cohorts/notarealid123
```
**Expect:** an error response, not a crash. MongoDB `_id`s are 24-character hex strings; a malformed one throws a BSON casting error that must be caught.

### 15. Missing required field
```
POST /api/cohorts
Body: { "cohortName": "Missing Slug Test" }
```
**Expect:** an error — `cohortSlug`, `programManager`, and `leadTeacher` are all `required` and this body is missing them.

---

## Quick status legend

| Code | Meaning |
|---|---|
| 200 | OK — successful GET / PUT / DELETE |
| 201 | Created — successful POST |
| 400/401 | Bad request / validation or auth failure |
| 404 | Not found — valid id format, but no matching document |
| 500 | Server error — should still return clean JSON, never a raw crash |

## Results log

| # | Route | Result | Notes |
|---|---|---|---|
| 1 | GET /api/cohorts | ✅ | |
| 2 | GET /api/cohorts/:id | | |
| 3 | POST /api/cohorts | | |
| 4 | PUT /api/cohorts/:id | | |
| 5 | DELETE /api/cohorts/:id | | |
| 6 | GET /api/students | ✅ | |
| 7 | GET /api/students/cohort/:id | | |
| 8 | GET /api/students/:id | | |
| 9 | POST /api/students | ✅ | |
| 10 | PUT /api/students/:id | ✅ | |
| 11 | DELETE /api/students/:id | ✅ | |
| 12 | Invalid enum | | |
| 13 | Duplicate email | | |
| 14 | Malformed id | | |
| 15 | Missing required field | | |

*(Update this table as you and your teammates run through the tests — fill in ✅/❌ and any notes.)*
