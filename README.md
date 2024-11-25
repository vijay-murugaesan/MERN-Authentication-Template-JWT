# MERN Authentication Template (JWT)

This is a starter template for a MERN stack application using JSON Web Tokens (JWT). The backend is built with [TypeScript](https://www.typescriptlang.org/), [Express](https://expressjs.com), [MongoDB](https://www.mongodb.com) and [Resend](https://resend.com) (for sending emails). There is also a Postman collection for testing the API. JWTs are stored in secure, HTTP-only cookies. The frontend is built with [React](https://react.dev) and [React Query](https://tanstack.com/query/latest).

Includes:

- register, login, logout, profile, account verification, password reset
- send emails for account verification and password reset
- get and remove sessions
- frontend forms for login, register, reset password, etc.
- custom react hooks to manage auth state & application data

## API Architecture

The API is built using different layers: routes, controllers, services and models.

- Routes are responsible for handling the incoming requests and forwarding them to the appropriate controller.
- Controllers are responsible for validating the request, calling the appropriate service, and sending back the response.
- Services are responsible for handling the business logic. They interact with the database and any external services. Services may also call other services.
- Models are responsible for interacting with the database. They contain the schema and any model utility methods.

\*\*\* For simple GET or DELETE requests that don't require any business logic, the controller may directly interact with the model.

#### Error Handling

Errors are handled using a custom error handler middleware. The error handler middleware catches all errors that occur in the application and processes them accordingly. Each controller needs to be wrapped with the `errorCatch()` utility function to ensure that any errors that are thrown within the controller are caught and passed on to the error handler middleware.

## Authentication Flow

When a user logs in, the server will generate two JWTs: `AccessToken` and `RefreshToken`. Both JWTs are sent back to the client in secure, HTTP-only cookies. The AccessToken is short-lived (15 minutes) and is passed on EVERY request to authenticate the user. The RefreshToken is long-lived (30 days) and is ONLY sent to the `/refresh` endpoint. This endpoint is used to generate a new AccessToken, which will then be passed on subsequent requests.

The frontend has logic that checks for `401 AccessTokenExpired` errors. When this error occurs, the frontend will send a request to the `/refresh` endpoint to get a new AccessToken. If that returns a 200 (meaning a new AccessToken was issued), then the client will retry the original request. This gives the user a seamless experience without having to log in again. If the `/refresh` endpoint errors, the user will be logged out and redirected to the login page.
