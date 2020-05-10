const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeAdviceArray } = require("./test-helpers");

describe("Advice Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: "postgresql://networth:tessg@localhost/networth",
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db.raw("TRUNCATE networth_advice CASCADE"));

  afterEach("cleanup", () => db.raw("TRUNCATE networth_advice CASCADE"));
  describe(`GET /api/advice`, () => {
    context(`Given no advice`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/api/advice").expect(200, []);
      });
    });
  });

  describe(`GET /api/advice`, () => {
    context("Given there are advice items in the database", () => {
      const testAdvice = makeAdviceArray();

      beforeEach("insert advice", () => {
        return db.into("networth_advice").insert(testAdvice);
      });

      it("responds with 200 and all of the advice items", () => {
        return supertest(app).get("/api/advice").expect(200, testAdvice);
      });
    });
  });
});
