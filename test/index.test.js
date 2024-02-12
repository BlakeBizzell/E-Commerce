const request = require("supertest");
const app = require("../index"); // assuming your Express app is in index.js
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { mockDeep } = require("jest-mock");

// Mock PrismaClient
jest.mock("@prisma/client", () => {
  return {
    ...jest.requireActual("@prisma/client"),
    PrismaClient: jest.fn(() => ({
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      user: {
        findUnique: jest.fn(),
      },
    })),
  };
});

// Load environment variables
require("dotenv").config();

describe("Token Verification Endpoint", () => {
  let prisma;

  beforeEach(() => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/verify-token");
    expect(response.status).toBe(401);
  });

  it("should return 401 if token is invalid", async () => {
    const token = "invalid_token";
    const response = await request(app)
      .get("/verify-token")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(401);
  });

  it("should return 200 if token is valid", async () => {
    // Create
    const payload = { username: "testuser" };
    const token = jwt.sign(payload, secretKey);

    const response = await request(app)
      .get("/verify-token")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return correct user information if token is valid", async () => {
    const secretKey = process.env.WEB_TOKEN;
    const payload = { username: "testuser" };
    const token = jwt.sign(payload, secretKey);

    // Mock the Prisma user lookup
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 1,
      username: "testuser",
    });

    const response = await request(app)
      .get("/verify-token")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.username).toBe("testuser");
  });
});

global.teardown = async () => {
  await closeDatabaseConnection();
  await shutdownServers();
};
