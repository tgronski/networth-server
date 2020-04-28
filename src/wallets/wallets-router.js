const path = require("path");
const knex = require("knex");
require("dotenv").config();
const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth')
const WalletsService = require("./wallets-service");

const walletsRouter = express.Router();
const jsonParser = express.json();

const serializeWallets = wallet => ({
  walletsid: wallet.id,
  walletsuserid: wallet.user_id,
  wallet_categories: wallet.wallet_categories,
  assets: wallet.assets,
});


walletsRouter
.route("/")
.all(requireAuth)
.get((req, res, next) => {
  user_id = req.user.id
  const knexInstance = req.app.get("db" );
  WalletsService.getWallets(knexInstance)
  

    .then(results => {
      res.status(200).json(results);
    })
    .catch(next);
})





module.exports = calculationsRouter;
