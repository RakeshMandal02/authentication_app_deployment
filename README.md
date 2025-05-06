# Authentication System

This project is a backend authentication system built with Node.js, Express, and MongoDB. It provides user registration, login, and admin approval functionalities with JWT-based authentication.

## Features

- User registration with email and password.
- Password hashing with bcryptjs.
- JWT token generation for authentication.
- Admin approval workflow for new users.
- Protected admin routes to view pending users and approve them.
- Middleware for authentication and role-based authorization.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- dotenv for environment variable management

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance running
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the `Config` folder with the following variables:
   ```
   PORT=3000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```
5. Start the server:
   ```
   npm start
   ```

## API Documentation

See [api.md](./api.md) for detailed API endpoint documentation.

## Testing the API

Use tools like Postman or curl to test the API endpoints. Remember to include the JWT token in the Authorization header for protected routes.

## Future Enhancements

- Add email verification and password reset.
- Implement frontend interface.
- Add logging and monitoring.
- Improve error handling and validation.
