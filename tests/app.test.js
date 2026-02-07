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
