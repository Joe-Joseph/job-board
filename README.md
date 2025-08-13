# Job Board

[Job Boar Demo](https://www.loom.com/share/6d2e392051a043fe9f09899a2ec79074?sid=bf450705-7440-425d-a5f1-4e5afc90982a)

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
   yarn install
   ```

3. **Create an environment file**
   Copy the `.env.example` to `.env` and update the values:

   ```
   cp .env.example .env
   ```

4. **Start the development server**
   ```
   yarn dev
   ```

The app should now be running at http://localhost:5173.

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
yarn test
```

To open Vitest UI:

```
yarn test:ui
```

To run tests once (for CI):

```
yarn test:run
```

To generate a coverage report:

```
yarn test:coverage
```

## Architecture note

The project uses a modular, feature-based React architecture with Redux Toolkit for state management. Components are reusable, and routes are protected via wrapper components. I used MSW for mocking API calls. The app follows a clear separation of concerns, making it scalable and maintainable.

