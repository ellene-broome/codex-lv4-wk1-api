
// app.js
import express from "express";
import helmet from "helmet";
import items from "./data.js";

// app is now the "server"
const app = express();

// middleware
app.use(helmet());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContentHub API" });
});

// Day 1 routes

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

// Day 2 routes

app.get("/items", (req, res) => {
   res.status(200).json(items);
});

app.post("/items", (req, res) => {
  const { name } = req.body || {};

  // validation (Day 3 style)
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newId = items.length + 1;


  const itemWithId = {
    id: items.length + 1,
    name: name,
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

// export app
export default app;


