// import testing tools
// Makes fake requests to the app and checks the responses and reset the data before each test
import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { resetPosts } from "../src/data.js";

beforeEach(() => {
  resetPosts();
});


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

describe("GET /posts with offset pagination", () => {
  it("returns paginated data with offset and limit", async () => {
    const response = await request(app).get("/posts?offset=0&limit=1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.length).toBe(1);
    expect(response.body).toHaveProperty("total");
  });

  it("returns 400 for invalid pagination params", async () => {
    const response = await request(app).get("/posts?offset=-1&limit=0");
    expect(response.status).toBe(400);
  });
});

describe("GET /posts/:id includeComments", () => {
  it("includes comments when includeComments=true", async () => {
    const response = await request(app).get("/posts/1?includeComments=true");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("comments");
    expect(Array.isArray(response.body.comments)).toBe(true);
  });

  it("does not include comments by default", async () => {
    const response = await request(app).get("/posts/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).not.toHaveProperty("comments");
  });
});
