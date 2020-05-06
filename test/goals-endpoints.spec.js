const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeGoalsArray } = require("./test-helpers");

describe("Goals Endpoints", function() {
  let db;




  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: "postgresql://networth:tessg@localhost/networth"
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());

//   before("clean the table", () =>
//     db.raw("TRUNCATE networth_goals CASCADE")
//   );

//   afterEach("cleanup", () =>
//     db.raw("TRUNCATE networth_goals CASCADE")
//   );
//   describe(`GET /api/goals`, () => {
//     context(`Given no goals`, () => {
//       it(`responds with 200 and an empty list`, () => {
//         return supertest(app)
//           .get("/api/goals")
//           .expect(200, []);
//       });
//     });
//   });

//   describe(`GET /api/goals`, () => {
//     context("Given there are goals items in the database", () => {
//       const testGoals = makeGoalsArray();

//       beforeEach("insert goals", () => {
//         return db.into("networth_goals").insert(testGoals);
//       });

//       it("responds with 200 and all of the goals items", () => {
//         return supertest(app)
//           .get("/api/goals")
//           .expect(200, testGoals);
//       });
//     });
//   });
});


