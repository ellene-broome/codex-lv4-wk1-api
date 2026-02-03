const express = require("express");
const helmet = require("helmet");

const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" });
});

// Example public-API style routes
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
});

app.get("/posts", (req, res) => {
  res.json([
    { id: 1, title: "Hello World" },
    { id: 2, title: "Express is working!" }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
