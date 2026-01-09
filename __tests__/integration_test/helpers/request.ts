import supertest from "supertest";
import app from "../../../src/server"

export const request = supertest(app)
export const prefix = "/api/v1"