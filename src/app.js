const express = require("express");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContentHub API" });
});

// Day 1: imitate a public API (example routes)
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

module.exports = app;
