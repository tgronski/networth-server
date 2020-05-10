const path = require("path");
const knex = require("knex");
require("dotenv").config();
const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const WalletsService = require("./wallets-service");

const walletsRouter = express.Router();

walletsRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    WalletsService.getWallets(knexInstance)

      .then((results) => {
        res.status(200).json(results);
      })
      .catch(next);
  });

module.exports = walletsRouter;
