# 🔒 Passport Authentication Full Stack Project

This project demonstrates a robust full-stack authentication system built with **Passport.js**, featuring secure login and registration, email-based password resets, and protected routes. It's designed using the **MERN stack** (MongoDB, Express, React, Node.js) and ensures best practices in session and password management.

---

## ✨ Features

- 🧾 User registration and login
- 🔑 Password reset via email tokens
- 🔒 Password hashing with `bcrypt`
- 🛡️ JWT Cookies using `Passport.js` and `jsonwebtokens`
- 🔒 Secure OAuth Login with Google
- 🚫 Protected routes and access control
- 🗄️ MongoDB for scalable data storage
- 🎯 Efficient Error handling

---

## 🛠️ Technologies Used

- **TypeScript**
- **NextJS Frontend**
- **MongoDB**
- **Express.js**
- **Node.js**
- **Passport.js**
- **bcrypt**
- **axios**
- **zod**

---

## 📦 Dependencies

- `cors`
- `cookie-parser`
- `express`
- `passport`, `passport-jwt`, `passport-google-oauth20`
- `dotenv`
- `mongoose`
- `nodemailer`
- `bcrypt`

---

## 🚀 Installation

### 📁 Clone the repository:

```bash
git clone https://github.com/ishanjarwal/passport-authentication
```

### 📦 Install dependencies:

```bash
# Client setup
cd client
npm install

# Server setup
cd ../server
npm install
```

### ⚙️ Add environment variables:

Create a `.env` file inside the `/server` directory and configure the following:

```env
# /server
PORT=8080
FRONTEND_HOST=http://localhost:3000
DB_URL=""
SALT_ROUNDS=
EMAIL_USER=
EMAIL_FROM=
EMAIL_PASSWORD=
EMAIL_PORT=587
EMAIL_PROVIDER=smtp.gmail.com
JWT_ACCESS_TOKEN_SECRET=
JWT_REFRESH_TOKEN_SECRET=
JWT_PASSWORD_RESET_SECRET=
ENVIRONMENT=development
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Then in the `/client` directory, add a `.env` file with:

```env
# /client
NEXT_PUBLIC_BASE_URL=http://localhost:8080/api/v1
```

---

### 🏁 Start both development servers:

In **two separate terminals**, run:

```bash
# In /client
npm run dev
```

```bash
# In /server
npm run dev
```

---

## 🎯 Final Notes

This project serves as a boilerplate for any full-stack application requiring secure user authentication and session handling. It can be extended to include social login, or role-based access control.

Happy coding! 💻
