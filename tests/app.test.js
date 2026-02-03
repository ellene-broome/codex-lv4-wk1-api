// import testing tools
import { describe, it, expect } from "vitest";
// import supertest to simulate HTTP requests (API testing)
import request from "supertest";
// import the Express app from app.js
import app from "../src/app.js";

//start of tests by sending a fake GET request to "/"
describe("GET /", () => {
  it("returns welcome JSON", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});
