// src/app.js
import express from "express"; // Express = framework for building APIs
import helmet from "helmet"; // Helmet adds security-related HTTP headers
import items, { posts, comments } from "./data.js"; // in-memory data arrays

// app is the Express SERVER instance
const app = express();

/* ------------------ MIDDLEWARE ------------------ */

// Helmet helps PROTECTS your API by setting secure headers
app.use(helmet());

// This lets the server read JSON from request bodies (POST/PUT)
app.use(express.json());

// Extra practice: logs how long each request took
app.use((req, res, next) => {
  const start = Date.now();

  // "finish" runs when the response has been sent
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next(); // move on to the next middleware/route
});

/* ------------------ ROUTES ------------------ */

// Root route — checks that server is alive
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContentHub API" });
});

/* -------- Day 2: GET /posts with OFFSET pagination --------
   Query params:
   - offset: where to start in the array (ex: 0, 1, 2)
   - limit: how many posts to return
*/
app.get("/posts", (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : posts.length;

  // validate offset/limit -  don’t slice weird values
  if (Number.isNaN(offset) || Number.isNaN(limit) || offset < 0 || limit <= 0) {
    return res.status(400).json({ error: "Invalid pagination params" });
  }

  const data = posts.slice(offset, offset + limit);

  // Return metadata + paginated results
  return res.json({
    offset,
    limit,
    total: posts.length,
    data,
  });
});

// Users route (hardcoded sample)
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

/* -------- Day 2: GET /items --------
   Returns all items from data.js
*/
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

/* -------- POST /items --------
   Adds a new item to the items array.
   Requires: { "name": "something" } in the request body
*/
app.post("/items", (req, res, next) => {
  const { name } = req.body || {};

  // If name missing, create an error and pass it to error middleware
  if (!name) {
    const error = new Error("Name is required");
    error.status = 400;
    return next(error);
  }

  // Create new item (simple id logic)
  const newItem = {
    id: items.length + 1,
    name,
  };

  items.push(newItem); // store it in memory
  res.status(201).json(newItem); // 201 = created
});

/* -------- GET /posts/:id (supports includeComments) --------
   If includeComments=true, add comments array to the response
*/
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  // validate id
  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // find the post
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // query param must literally be "true"
  const includeComments = req.query.includeComments === "true";

  if (includeComments) {
    // only comments whose postId matches this post
    const postComments = comments.filter((c) => c.postId === id);
    return res.json({ ...post, comments: postComments });
  }

  return res.json(post);
});

/* -------- DELETE /posts/:id --------
   Deletes a post from the posts array and returns the deleted post
*/
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  // remove the post at that index and return it
  const deleted = posts.splice(index, 1)[0];
  return res.status(200).json(deleted);
});

/* ------------------ FALLBACK + ERROR HANDLING ------------------ */

// If no route matched, return 404 JSON
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler (catches next(error))
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

export default app; // exported so server.js and tests can use it
