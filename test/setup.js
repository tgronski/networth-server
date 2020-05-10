require("dotenv").config();
const { expect } = require("chai");
const supertest = require("supertest");

process.env.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  "postgresql://dunder_mifflin@localhost/networth";

global.expect = expect;
global.supertest = supertest;
