# JWT-Demo

A simple **Node.js Express project** that demonstrates how to get started with **JSON Web Tokens (JWT)** for authentication.  
Users can **sign up, log in, and access protected routes** using JWT.

---

## 📌 Features
- Register new users with secure **password hashing** (`bcryptjs`).
- Authenticate users and return a **JWT token** on login.
- Protect routes using a middleware that verifies JWT tokens.
- Example protected route: `/dashboard`.
- Environment variables managed with `.env`.

---

## 📂 Project Structure
```

.
├── server.js         # Main Express server with JWT authentication
├── package.json      # Project metadata
├── package-lock.json # Dependency lock file
└── .env              # Environment variables (TOKEN\_SECRET, PORT)

````

⚠️ **Important:** You must create a `.env` file in the root of the project with the following variables:  
```env
TOKEN_SECRET=your-secret-key
PORT=3000
````

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/jwt-demo.git
cd jwt-demo
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
node server.js
```

Or (if using nodemon for auto-reload):

```bash
npx nodemon server.js
```

The server will start at:

```
http://localhost:3000
```

---

## 🛠 How It Works

* **`POST /signup`** – Registers a new user.
  Example request (JSON body in Postman):

  ```json
  {
    "username": "john",
    "password": "mypassword"
  }
  ```

  Response:

  ```json
  { "message": "User registered successfully" }
  ```

* **`POST /login`** – Authenticates the user and returns a **JWT token**.
  Example response:

  ```json
  { "token": "<your-jwt-token>" }
  ```

* **`GET /dashboard`** – Protected route, requires a valid token.
  In Postman, add a header:

  ```
  Authorization: Bearer <your-jwt-token>
  ```

  Response:

  ```json
  { "message": "Welcome john, this is your dashboard!" }
  ```

---

## 📖 Testing with Postman

1. **Sign Up** – Send a `POST` request to `http://localhost:3000/signup` with `username` and `password` in the JSON body.
2. **Log In** – Send a `POST` request to `http://localhost:3000/login` with the same credentials to receive a **JWT token**.
3. **Access Dashboard** – Send a `GET` request to `http://localhost:3000/dashboard` with the token in the `Authorization` header as `Bearer <token>`.

---

## 📄 License

MIT – free to use, share, or modify.

---

## ✨ Author

Made with ❤️ by [Jay Prakash Valecha](https://github.com/JPV2207)
