const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeWalletsArray } = require("./test-helpers");
const helpers = require('./test-helpers')

describe("Wallets Endpoints", function() {
  let db;

  const {
    testUsers,
    testWallets  
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
    db.raw("TRUNCATE networth_wallet CASCADE")
  );

  afterEach("cleanup", () =>
    db.raw("TRUNCATE networth_wallet CASCADE")
  );

  describe(`GET /api/wallets`, () => {
    context(`Given no wallets`, () => {
      it(`responds with 401 and an error`, () => {
        return supertest(app)
          .get("/api/wallets")
          .expect(401, {error: 'Missing bearer token'});
      });
    });
  });

  describe(`GET /api/wallets`, () => {
    context("Given there are wallets items in the database", () => {
      const testWallets = makeWalletsArray(testUsers);

      beforeEach("insert wallets", () => {
        return db.into("networth_wallet").insert(testWallets);
      });
      it('responds with 401 and and error', () => { 
        return supertest(app)
          .get("/api/wallets")
          .expect(401, {error: 'Missing bearer token'});
      });
    });
  });
});