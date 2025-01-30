const db = require("../data/db-config");
const request = require("supertest");
const server = require("./server");
const Character = require("./characters-model");

const areToo = { species: "Droid", name: "r2d2", planet: "naboo" };

test("sanity", () => {
  expect(true).toBe(true);
});
test("correct environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
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

describe("[POST] /characters", () => {
  test("adds a new character to the database", async () => {
    await request(server).post("/characters").send(areToo);
    expect(await db("characters")).toHaveLength(4);
  });
  test("responds with the newly created character", async () => {
    const response = await request(server).post("/characters").send(areToo);
    expect(response.body).toMatchObject(areToo);
  });
});

describe("[DELETE] /characters", () => {
  test("removes the character with the given ID from the database", async () => {
    const [id] = await db("characters").insert(areToo);
    let selectedCharacter = await db("characters").where({ id }).first();
    expect(selectedCharacter).toBeTruthy();
    const response = await request(server).delete(`/characters/${id}`);
    selectedCharacter = await db("characters").where({ id }).first();
    expect(selectedCharacter).toBeFalsy();
    expect(response.status).toBe(204);
  });
});

/* <-- CHARACTER-MODEL FUNCTIONS --> */
describe("getAll function", () => {
  test("responds with a 200 OK after fetching characters", async () => {
    const response = await request(server).get("/characters");
    expect(response.status).toBe(200);
  });
  test("returns all characters", async () => {
    const response = await request(server).get("/characters");
    expect(response.body).toHaveLength(3);
  });
});

describe("insertCharacter function", () => {
  const areToo = { species: "Droid", name: "r2d2", planet: "naboo" };
  test("resolves the newly created character", async () => {
    const result = await Character.insertCharacter(areToo);
    expect(result).toMatchObject(areToo);
  });
  test("adds the character to the characters tables", async () => {
    let records;
    await Character.insertCharacter(areToo);
    records = await db("characters");
    expect(records).toHaveLength(4);
  });
});
