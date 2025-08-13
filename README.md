# Job Board

[Job Board Demo](https://www.loom.com/share/acf05cc03f574df29cec43d93275f20f?sid=cba5ef5a-39f3-4915-ae39-15d8b89b0893)

You can access the application [here](https://job-board-iota-flax.vercel.app/)

You can log in with the following credentials:

**Email**
```
test@test.com
```

**Password**
```
Password1!
```


# Job Board Features

- Authentication
- Dashboard with job list and filters
- Job details page
- Application Submission

## Table of Contents

- [Setup](#setup)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)

---

## Setup

Follow these steps to get the application running locally:

1. **Clone the repository**

````
git clone https://github.com/Joe-Joseph/job-board.git
cd job-board
````
---
2. **Install dependencies**

   ```
   cp yarn install
   ```

3. **Create an environment file**
   Copy the `.env.example` to `.env` and update the values:

   ```
   cp .env.example .env
   ```

4. **Start the development server**
   ```
   cp yarn dev
   ```

The app should now be running at http://localhost:5173.

Please use the email and password from your .env file to log in

---

## Scripts

Here is a summary of the scripts included in this project:

| Script               | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `yarn dev`           | Starts the Vite development server. Use this to run the app locally. |
| `yarn test`          | Runs Vitest in watch mode to continuously run tests as you develop.  |
| `yarn test:ui`       | Opens Vitest's interactive UI for running and monitoring tests.      |
| `yarn test:run`      | Runs Vitest tests once (useful for CI pipelines).                    |
| `yarn test:coverage` | Runs all tests and generates a coverage report.                      |

---

## Environment Variables

Create a `.env` file in the root of the project with the following variables:

### .env.example

```env
VITE_LOGIN_EMAIL=your_email@example.com
VITE_LOGIN_PASSWORD=your_password
VITE_AUTH_TOKEN=your_auth_token
VITE_SECRET_KEY=your_secret_key
VITE_TOKEN_EXPIRATION_TIME=24h
```

---

## Running Tests

To run tests in watch mode:

```
cp yarn test
```

To open Vitest UI:

```
cp yarn test:ui
```

To run tests once (for CI):

```
cp yarn test:run
```

To generate a coverage report:

```
cp yarn test:coverage
```

## Architecture note

The project uses a modular, feature-based React architecture with Redux Toolkit for state management. Components are reusable, and routes are protected via wrapper components. I used MSW for mocking API calls. The app follows a clear separation of concerns, making it scalable and maintainable. I used TailwindCSS for styling.

