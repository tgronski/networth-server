const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeGoalsArray } = require("./test-helpers");
const helpers = require('./test-helpers')

describe("Goals Endpoints", function() {
  let db;
  const {
    testUsers,
    testGoals 
} = helpers.makeWalletsFixtures()



  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: "postgresql://networth:tessg@localhost/networth"
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw("TRUNCATE networth_goals CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE networth_goals CASCADE")
  );
  describe(`GET /api/goals`, () => {
    context(`Given no goals`, () => {
      it(`responds with 401 and an error`, () => {
        return supertest(app)
          .get("/api/goals")
          .expect(401, {error: 'Missing bearer token'});        
        });
    });
  });

  describe(`GET /api/goals`, () => {
    context("Given there are goals items in the database", () => {
      const testGoals = makeGoalsArray(testUsers);

      beforeEach("insert goals", () => {
        return db.into("networth_goals").insert(testGoals);
      });

      it("responds with 401 and error", () => {
        return supertest(app)
          .get("/api/goals")
          .expect(401, {error: 'Missing bearer token'});
      });
    });
  });
});


