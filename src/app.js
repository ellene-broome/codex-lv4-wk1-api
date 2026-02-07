
// app.js
import express from "express";
import helmet from "helmet";
import items, { posts } from "./data.js";

// app is now the "server"
const app = express();

// middleware
app.use(helmet());
app.use(express.json());

// request timing log extra credit
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next();
});

// root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContentHub API" });
});

// Day 1 routes

app.get("/posts", (req, res) => {
  res.json(posts);
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

app.post("/items", (req, res, next) => {
  const { name } = req.body || {};

  if (!name) {
    const error = new Error("Name is required");
    error.status = 400;
    return next(error);
  }

  const newItem = {
    id: items.length + 1,
    name,
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

// GET /posts/:id (404 if missing)
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  // validation for id
  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  return res.json(post);
});


// DELETE /posts/:id (404 if missing)
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const deleted = posts.splice(index, 1)[0];
  return res.status(200).json(deleted);
});


app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// centralized error handling middleware Day 3
app.use((err, req, res) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({ error: message });
});





// export app
export default app;


