## 🔒Passport Authentication Full Stack Project

This project demonstrates a full stack application using Passport.js for authentication. It includes a MongoDB database, Express.js server, React frontend, and Node.js backend.

## Features

*   User registration and login
*   Password management (forget and reset through email tokens)
*   Password hashing with bcrypt
*   Session management with Passport.js
*   Protected routes and access
*   MongoDB for data storage

## Technologies Used

*   MongoDB
*   Express.js
*   React
*   Node.js
*   Passport.js
*   bcrypt

## Dependencies

*   cors
*   cookie-parser
*   express
*   passport and passport-jwt
*   dotenv
*   mongoose
*   nodemailer
*   bcrypt

## Installation and Usage

1.  Clone the repository:
2.  Install server dependencies:
3.  Install client dependencies:
4.  Create a `.env` file in the server directory and add your MongoDB URI and session secret:
5.  Run the development server:

```plaintext
git clone https://github.com/ishanjarwal/passport-authentication.git
```

```plaintext
// in both client and server directory
npm install
```

```plaintext
// /server/.env

MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
```

```plaintext
// /server
npm run dev
```