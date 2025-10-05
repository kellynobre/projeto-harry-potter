import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../index.js";

describe("Teste da API de Personagens", () => {
  it("status 200 na rota /characters", async () => {
    const res = await request(app).get("/characters");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("lista de objetos com propriedade name", async () => {
    const res = await request(app).get("/characters");
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name");
  });
});
