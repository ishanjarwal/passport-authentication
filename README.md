# Passport Authentication Full Stack Project

This project demonstrates a full stack application using Passport.js for authentication. It includes a MongoDB database, Express.js server, React frontend, and Node.js backend.

## Features

- User registration and login
- Password hashing with bcrypt
- Session management with Passport.js
- Protected routes
- MongoDB for data storage

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Passport.js
- bcrypt

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ishanjarwal/passport-authentication.git
   ```
2. Install server dependencies:
   ```bash
   cd passport-authentication/server
   npm install
   ```
3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```
4. Create a `.env` file in the server directory and add your MongoDB URI and session secret:
   ```
   MONGO_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   ```
5. Run the development server:
   ```bash
   cd ../server
   npm run dev
   ```

## Usage

1. Register a new user.
2. Login with the registered credentials.
3. Access protected routes after authentication.
