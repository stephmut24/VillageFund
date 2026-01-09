import { describe, it, expect } from "@jest/globals";
import { request } from "../helpers/request";

describe("Testing Server", () => {

  it("Root endpoint should return welcome message", async () => {
    const res = await request.get("/");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("version");
  });

  it("Health endpoint should return healthy status", async () => {
    const res = await request.get("/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("healthy");
  });

  

  it("API docs endpoint should respond", async () => {
    const res = await request.get("/api-docs");

    expect([200, 301, 302]).toContain(res.status);
  });

  it("Non-existent route should return 404", async () => {
    const res = await request.get("/non-existent-route");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

});
