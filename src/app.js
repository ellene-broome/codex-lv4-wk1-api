// src/app.js
import express from "express";
import helmet from "helmet";
import cors from "cors";
import crypto from "node:crypto"; // for generating request IDs
import { posts, comments } from "./data.js"; // keep Week 1 routes working
import { supabase } from "./supabaseClient.js"; // for Week 2 routes

const app = express();

/* ------------------ MIDDLEWARE ------------------ */
app.use(helmet());

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));


// A5 guard: reject non-JSON bodies
app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  const contentLength = Number(req.headers["content-length"] || 0);

  const hasBody = req.method !== "GET" && contentLength > 0;
  const isJson = contentType.includes("application/json");

  if (hasBody && !isJson) {
    return res.status(415).json({
      error: "UNSUPPORTED_MEDIA_TYPE: use application/json",
    });
  }

  next();
});



// JSON parser AFTER the guard
app.use(express.json());


app.use((req, res, next) => {
  const requestId = crypto.randomUUID();
  res.setHeader("X-Request-Id", requestId);
  req.requestId = requestId; // attach to req for potential use in handlers
  next();
});

/* ------------------ TIMER LOGGER MIDDLEWARE ------------------ */
// simple request timer log
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });
  next();
});

/* ------------------ ROUTES ------------------ */

app.get("/health", (req, res) => {
  res.json({ ok: true, data: { status: "ok" } });
});


// health check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ContentHub API" });
});

/* -------- Week 1: GET /posts with OFFSET pagination -------- */
app.get("/posts", (req, res) => {
  const offset = req.query.offset ? Number(req.query.offset) : 0;
  const limit = req.query.limit ? Number(req.query.limit) : posts.length;

 /* if (Number.isNaN(offset) || Number.isNaN(limit) || offset < 0 || limit <= 0) {
    return res.status(400).json({ error: "Invalid pagination params" });
  }*/

   //modification
   // validation
if (Number.isNaN(offset) || Number.isNaN(limit)) {
  return res.status(400).json({ error: "VALIDATION_ERROR: limit/offset must be numbers" });
}

if (offset < 0 || limit <= 0) {
  return res.status(400).json({ error: "VALIDATION_ERROR: offset must be >= 0 and limit must be > 0" });
}

if (limit > 100) {
  return res.status(400).json({ error: "VALIDATION_ERROR: limit must be 100 or less" });
}
 // end modification 

  const data = posts.slice(offset, offset + limit);

  return res.json({
    offset,
    limit,
    total: posts.length,
    data,
  });
});

// sample users
app.get("/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

/* ------------------ ITEMS (Supabase) ------------------ */

/* GET /items - list rows */
app.get("/items", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("id", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
});

/* POST /items - insert row */
app.post("/items", async (req, res) => {
  try {
    const { name, category } = req.body || {};

    if (!name || !category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const { data, error } = await supabase
      .from("items")
      .insert([{ name, category }])
      .select("*")
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
});

/* Patch modification */
app.patch("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, category } = req.body || {};
  if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id" });
    }
    // PATCH only updates fiels provided
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (category !== undefined) updates.category = category;

    // If client sends nothing to update
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "At least one of name or category must be provided" });
    }

    const { data, error } = await supabase
      .from("items")
      .update(updates)
      .eq("id", id)
      .select("*");

      if (error) return res.status(500).json({ error: error.message });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
});
/* end modification */

/* PUT /items/:id - update row (200 or 404) */
app.put("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, category } = req.body || {};

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (!name || !category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const { data, error } = await supabase
      .from("items")
      .update({ name, category })
      .eq("id", id)
      .select("*");

    if (error) return res.status(500).json({ error: error.message });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(200).json(data[0]);
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
});

/* DELETE /items/:id - delete row (204 or 404) */
app.delete("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const { data, error } = await supabase
      .from("items")
      .delete()
      .eq("id", id)
      .select("id"); // to tell if something was deleted

    if (error) return res.status(500).json({ error: error.message });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ error: "Unexpected server error" });
  }
});

/* -------- Week 1: GET /posts/:id (includeComments) -------- */
app.get("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const includeComments = req.query.includeComments === "true";

  if (includeComments) {
    const postComments = comments.filter((c) => c.postId === id);
    return res.json({ ...post, comments: postComments });
  }

  return res.json(post);
});

/* -------- Week 1: DELETE /posts/:id -------- */
app.delete("/posts/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Post not found" });

  const deleted = posts.splice(index, 1)[0];
  return res.status(200).json(deleted);
});

/* ------------------ FALLBACK + ERROR HANDLING ------------------ */
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ error: message });
});

export default app;
