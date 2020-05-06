const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeCalculationsArray } = require("./test-helpers");
const helpers = require('./test-helpers')

describe("Calculations Endpoints", function() {
  let db;

  const { testUsers,
    testCalculations  
    } = helpers.makeCalculationsFixtures()

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: "postgresql://networth:tessg@localhost/networth"
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE networth_calculations CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE networth_calculations CASCADE")
  );


  describe(`GET /api/calculations`, () => {
    context(`Given no calculations`, () => {
      it(`responds with 401 and an error`, () => {
        return supertest(app)
          .get("/api/calculations")
          .expect(401, {error: 'Missing bearer token'});
      });
    });
  });

  describe(`GET /api/calculations`, () => {
    context("Given there are calculations items in the database", () => {
      const testCalculations = makeCalculationsArray(testCalculations);

      beforeEach("insert calculations", () => {
        return db.into("networth_calculations").insert(testCalculations);
      });

      it("responds with 401 and all of the calculations items", () => {
        return supertest(app)
          .get("/api/calculations")
          .expect(401);
      });
    });
  });
});