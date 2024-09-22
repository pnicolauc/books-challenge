# Books Challenge - Server
# Technologies used
- Node.js
- Typescript
- React
- Next.js
- Tailwind

# Design choices

## Assumptions

- Focus was not on beauty but on usability of the user interface.

## Project Structure

The project structure follows the structure recommended in the Next.js App Router documentation, with additional folders for API server client, UI components and other things like Typescript types.

## Authentication

Authentication is done using BASIC authentication. This authentication is controlled in the frontend by sending a 'WWW-Authenticate' header if the user accesses any page prefixed with `/admin`. The middleware then confirms with the server that the user credentials are correct. The credentials provided are then used for endpoints that require authentication on the server.

## Pages

### Public Book List

TODO query params

### Public Book Detail

TODO reservation

### Admin Book List

TODO upload

### Admin Book Detail

TODO etags 
TODO reservations

## Improvements

improvements can be made to the current implementation, with the most relevant being.

- Better error handling - Returning more specific errors to the user.
- Better data validation - More granular validation, for example, enforce that rating must be a number between 1 and 5.
- Improve admin update form and add preview