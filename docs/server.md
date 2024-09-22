# Books Challenge - Server
# Technologies used
- Node.js
- Typescript
- express.js - Web application framework
- typia - Runtime type validations
- bcrypt - Password hashing
- dotenv - Support for .env files 
- csv-parser
- multer - Handle files through multipart/form-data
- node-mailjet - Integration with Mailjet to send emails
- sequelize - ORM for Postgres
- pg & pg-hstore - Postgres plugin for sequelize

# Design choices

## Assumptions

- Only one table related to books was created to keep the implementation simple. One possible alternative approach would be to create separate tables for Authors, Language codes and Reservations.
- Upload must not fail if a single row fails. Also, if a row already exists it must update the existing data.


## Project Structure

The project structure is as follows:

```
src/
    controllers/
    middlewares/
    models/
    routes/
    services/
    app.ts
.env
```

This structure allows the segregation of different layer concerns. 


## API

### Authentication

Authentication is done using BASIC authentication. When initialized, the system has only one single user, the system admin which is configured through env variables. Authenticated users can register other users.

Some endpoints are protected by the authentication middleware while others are not.

The endpoints of the book API are as follows
```http
# Login (needs BASIC authentication) - There is no session, endpoint only validates that the user/password is correct and returns user info
POST /auth/login

# Login (needs BASIC authentication)
GET /auth/register

```

You can view specific request examples in the project root `exampleRequests.http` (the requests can be made using the httpYac vscode extension or the HTTP client in any Jetbrains IDE).

### Books

The endpoints of the book API are as follows
```http
# Fetch books
GET /books

# Fetch book
GET /books/:id

# Upload books (needs BASIC authentication)
POST /books/upload 

# Create/Update book (needs BASIC authentication)
PUT /books/:id

# Reserve book
POST /books/:id/reserve

```

You can view specific request examples in the project root `exampleRequests.http` (the requests can be made using the httpYac vscode extension or the HTTP client in any Jetbrains IDE).

### Upload
The upload implementation reads a file sent through a `multipart/form-data` form and bulk inserts all the successfully parsed rows. When completed, an email is sent to the confiured system admin with details of the book upload (successfully uploaded books, errors, etc).

### ETags

Fetching and updating a book support etags. On the detail endpoint, a response header `etag` is sent with the `md5` of the content. When calling the update endpoint, an `If-Match`  (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match) header may be added to the request to only update the resource if the etag matches the one on the server. This prevents a user to replace new data that he hasn't seen.

#### Transactions

Updating books by passing an ETag or reserving a book are operations that use transactions. This prevents read-modify-write and check-then-act race conditions for ETags and reservations respectively.

The reservation implementation also includes an expiration timestamp when the reservation is made so it automatically expires when the timestamp is exceeded.

## Improvements

improvements can be made to the current implementation, with the most relevant being.

- Better error handling - Returning more specific errors to the API user.
- Better data validation - More granular validation, for example, enforce that rating must be a number between 1 and 5.
- Upload queueing - Currently, the upload endpoint returns 202 status code immediatly and proceeds to read the csv. An improvements could be made to add a queueing system in order not to overload the application.