const db = require("../data/db-config");
const request = require("supertest");
const server = require("./server");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /characters", () => {
  test("responds with a 200 OK after fetching characters", async () => {
    const response = await request(server).get("/characters");
    expect(response.status).toBe(200);
  });
  test("returns all characters", async () => {
    const response = await request(server).get("/characters");
    expect(response.body).toHaveLength(3);
  });
});
