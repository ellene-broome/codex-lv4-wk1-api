// import express to create a basic API
// import helmet for security
const express = require("express");
const helmet = require("helmet");

// app is now the "server"
const app = express();

// use helmet middleware for security best practices
// use express.json middleware to parse JSON request bodies
app.use(helmet());
app.use(express.json());

// root route located at "/" 3000/
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContentHub API" });
});

// Day 1: imitate a public API (example routes)
// GET /posts - returns a list of posts located at /posts
// GET /users - returns a list of users located at /users
app.get("/posts", (req, res) => {
  res.json([
    { id: 1, title: "Hello World", author: "Alice" },
    { id: 2, title: "Express API", author: "Bob" },
  ]);
});

app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

// export the app for use in server.js and testing
// allows other files to import the app
export default app;

