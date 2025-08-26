// -------------------- IMPORTS --------------------
const express = require("express");
const bcrypt = require("bcryptjs"); // for password hashing
const jwt = require("jsonwebtoken"); // for JWT
const dotenv = require("dotenv"); // for .env file

dotenv.config(); // load environment variables
const app = express();
app.use(express.json()); // so we can read JSON body from requests

// -------------------- IN-MEMORY DATABASE --------------------
// (In real apps, you would use MongoDB/MySQL/Postgres)
const users = []; // stores users as { username, passwordHash }


// -------------------- HELPER: Generate JWT --------------------
function generateToken(user) {
  // user object will be something like { username: "jay" }
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "10m" });
}

// -------------------- SIGN-UP --------------------
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // check if user already exists
  const existingUser = users.find((u) => u.username === username);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  // hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // store user
  users.push({ username, passwordHash });
  res.json({ message: "User registered successfully" });
});

// -------------------- LOGIN --------------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // find user
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  // check password
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  // generate token
  const token = generateToken({ username });
  res.json({ token });
});

// -------------------- AUTHENTICATION MIDDLEWARE --------------------
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) return res.sendStatus(401); // no token provided

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // invalid/expired token

    req.user = user; // save user info in request
    next();
  });
}

// -------------------- PROTECTED ROUTE --------------------
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}, this is your dashboard!`,
  });
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
