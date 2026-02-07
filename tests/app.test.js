// import testing tools
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /items", () => {
  it("returns an array of items with status 200", async () => {
    const response = await request(app).get("/items");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /posts/:id", () => {
  it("returns a post when it exists", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("returns 404 when post is missing", async () => {
    const response = await request(app).get("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("returns 400 for invalid id", async () => {
    const response = await request(app).get("/posts/abc");

    expect(response.status).toBe(400);
  });
});

describe("DELETE /posts/:id", () => {
  it("deletes a post when it exists", async () => {
    const response = await request(app).delete("/posts/2");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 2);
  });

  it("returns 404 when post is missing", async () => {
    const response = await request(app).delete("/posts/999");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  it("returns 400 for invalid id", async () => {
    const response = await request(app).delete("/posts/nope");

    expect(response.status).toBe(400);
  });
});
