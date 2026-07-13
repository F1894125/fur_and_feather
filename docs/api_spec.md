# API Specification

This document describes the current backend API endpoints related to authentication and user profile management for the Fur & Feather project. It is intended for the frontend team so they can integrate authentication flows, protected routes, and profile-related screens.

## 1. Base URL

When running locally, the backend is served at:

- Base URL: http://localhost:8000

All endpoints below are relative to this base URL.

## 2. Authentication Overview

The backend uses:

- Django REST Framework
- dj-rest-auth for authentication endpoints
- JWT-based authentication via cookies
- Social authentication for Google and Facebook

### JWT behavior

The application is configured to issue JWTs through HTTP-only cookies named:

- access-token
- refresh-token

These cookies are intended to be sent automatically by the browser for authenticated requests.

## 3. Common Conventions

### Content type

Use `application/json` for requests that send a JSON body.

### Authentication

The following endpoints require a logged-in user:

- Current user details
- Password change
- Profile details (view/update)
- Logout

For protected endpoints, the browser should include the JWT cookies issued by the backend.

### Response format

Successful responses generally return JSON data.

Errors are returned as standard DRF validation or authentication errors, usually with a JSON body containing field-level errors or a descriptive message.

## 4. Authentication Endpoints

### 4.1 Register a new user

- Method: `POST`
- URL: `/api/auth/registration/register/`
- Description: Creates a new user account.

#### Request body

```json
{
  "username": "jane_doe",
  "email": "jane@example.com",
  "password1": "StrongPassword123!",
  "password2": "StrongPassword123!",
  "first_name": "Jane",
  "last_name": "Doe"
}
```

#### Validation rules

- `username`: required
- `email`: required and must be a valid email address
- `password1` and `password2`: required; both must match
- `first_name`: required; must contain only letters and allowed accents/spaces/hyphens
- `last_name`: required; must contain only letters and allowed accents/spaces/hyphens

#### Success response

- Status: `201 Created`

```json
{
  "detail": "Verification e-mail sent."
}
```

> The project currently has email verification disabled in settings, so registration is expected to proceed without strict email confirmation.

---

### 4.2 Login

- Method: `POST`
- URL: `/api/auth/login/`
- Description: Authenticates a user and issues JWT cookies.

#### Request body

```json
{
  "username": "jane_doe",
  "password": "StrongPassword123!"
}
```

You may also use `email` instead of `username` depending on the client configuration.

#### Success response

- Status: `200 OK`

```json
{
  "key": "<authentication-token>"
}
```

> In this project, the backend is configured for JWT cookie-based authentication. The response will also set the JWT cookies on the client.

---

### 4.3 Logout

- Method: `POST`
- URL: `/api/auth/logout/`
- Description: Logs the authenticated user out and clears the authentication cookies.

#### Request headers

- `Cookie`: includes the current JWT cookies if present

#### Success response

- Status: `200 OK`

```json
{
  "detail": "Successfully logged out."
}
```

---

### 4.4 Get current authenticated user

- Method: `GET`
- URL: `/api/auth/user/`
- Description: Returns the profile information of the currently authenticated user.

#### Authentication

- Required

#### Success response

- Status: `200 OK`

```json
{
  "pk": 1,
  "username": "jane_doe",
  "email": "jane@example.com",
  "first_name": "Jane",
  "last_name": "Doe"
}
```

---

### 4.5 Update current authenticated user

- Method: `PUT` or `PATCH`
- URL: `/api/auth/user/`
- Description: Updates user information for the authenticated user.

#### Authentication

- Required

#### Request body example

```json
{
  "first_name": "Janet",
  "last_name": "Doe"
}
```

#### Success response

- Status: `200 OK`

```json
{
  "pk": 1,
  "username": "jane_doe",
  "email": "jane@example.com",
  "first_name": "Janet",
  "last_name": "Doe"
}
```

---

### 4.6 Password reset request

- Method: `POST`
- URL: `/api/auth/password/reset/`
- Description: Sends a password reset email to the provided address.

#### Request body

```json
{
  "email": "jane@example.com"
}
```

#### Success response

- Status: `200 OK`

```json
{
  "detail": "Password reset e-mail has been sent."
}
```

> The password reset email is configured to redirect users to the frontend application using the `FRONTEND_PASSWORD_RESET_URL` setting.

---

### 4.7 Password reset confirmation

- Method: `POST`
- URL: `/api/auth/password/reset/confirm/`
- Description: Confirms a password reset using a UID/token pair.

#### Request body

```json
{
  "uid": "MQ",
  "token": "abc123",
  "new_password1": "NewStrongPassword123!",
  "new_password2": "NewStrongPassword123!"
}
```

#### Success response

- Status: `200 OK`

```json
{
  "detail": "Password has been reset with the new password."
}
```

---

### 4.8 Password change

- Method: `POST`
- URL: `/api/auth/password/change/`
- Description: Allows an authenticated user to change their password.

#### Authentication

- Required

#### Request body

```json
{
  "old_password": "CurrentPassword123!",
  "new_password1": "NewStrongPassword123!",
  "new_password2": "NewStrongPassword123!"
}
```

#### Success response

- Status: `200 OK`

```json
{
  "detail": "New password has been saved."
}
```

---

## 5. Social Authentication Endpoints

### 5.1 Google login

- Method: `POST`
- URL: `/api/auth/google/`
- Description: Authenticates a user using a Google access token or authorization code and issues JWT cookies.

#### Request body

```json
{
  "access_token": "google-access-token"
}
```

You may also send a `code` field depending on the OAuth flow used by the frontend.

#### Success response

- Status: `200 OK`

```json
{
  "key": "<authentication-token>"
}
```

#### Notes

- The backend uses the Google OAuth2 adapter.
- The frontend callback URL is configured as `http://localhost:3000/auth/google/callback/`.

---

### 5.2 Facebook login

- Method: `POST`
- URL: `/api/auth/facebook/`
- Description: Authenticates a user using a Facebook access token and issues JWT cookies.

#### Request body

```json
{
  "access_token": "facebook-access-token"
}
```

#### Success response

- Status: `200 OK`

```json
{
  "key": "<authentication-token>"
}
```

## 6. Profile Endpoints

### 6.1 Get or update a user profile

- Method: `GET`, `PUT`, `PATCH`
- URL: `/accounts/api/profiles/<username>/`
- Description: Retrieves or updates the profile of a user identified by their username.

#### Authentication

- Required

#### Path parameters

- `username`: the username of the profile owner

#### Example

- `/accounts/api/profiles/jane_doe/`

#### Response fields

The profile response includes:

- `photo`: profile image URL or file field
- `bio`: short biography text
- `date_of_birth`: date of birth in `YYYY-MM-DD` format
- `phone_number`: phone number string
- `canonical_url`: the canonical API URL for the profile

#### Example response

```json
{
  "photo": "/media/users/2024/01/01/profile.jpg",
  "bio": "Pet lover and volunteer",
  "date_of_birth": "1995-05-20",
  "phone_number": "9876543210",
  "canonical_url": "/accounts/api/profiles/jane_doe/"
}
```

#### Update request example

```json
{
  "bio": "Adopter and animal lover",
  "phone_number": "9876543210"
}
```

#### Validation rules

- `photo`: must be an image file
- `photo` size must be less than 2 MB
- `photo` dimensions must be at least 400x400 pixels
- `phone_number`: must start with a digit from `6` to `9` and contain 10 digits total
- `date_of_birth`: must be a valid date, not in the future, and the user must be at least 18 years old
- `bio`: maximum 200 characters

## 7. Error Handling

Common error scenarios include:

- `400 Bad Request`: invalid payload or validation failure
- `401 Unauthorized`: missing or invalid authentication
- `404 Not Found`: profile not found or the requested username is not available

Example error response:

```json
{
  "phone_number": [
    "Invalid phone number: '123' - must start with a number between 6-9 and have 9 more digits."
  ]
}
```

## 8. Frontend Integration Notes

- Store the JWT cookies returned by the backend and send them with future requests.
- Use the social login endpoints for Google/Facebook authentication flows.
- After login, redirect the user to the app dashboard or profile page.
- For password reset flows, use the reset email link generated by the frontend URL configured in the backend settings.
- Use the profile endpoint to allow users to complete and edit their profile information.
