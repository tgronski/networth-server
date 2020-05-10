const path = require("path");
const knex = require("knex");
require("dotenv").config();
const express = require("express");
const AdviceService = require("./advice-service");

const adviceRouter = express.Router();
const jsonParser = express.json();

const serializeAdvice = (advice) => ({
  adviceid: advice.id,
  advicetitle: advice.title,
  advicecontent: advice.content,
  advicedate: advice.date_created,
});

adviceRouter.route("/").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  AdviceService.getAllAdvice(knexInstance)

    .then((results) => {
      res.status(200).json(results);
    })
    .catch(next);
});

adviceRouter
  .route("/:adviceid")
  .all((req, res, next) => {
    AdviceService.getById(req.app.get("db"), req.params.adviceid)
      .then((advice) => {
        if (!advice) {
          return res.status(404).json({
            error: { message: `Advice doesn't exist` },
          });
        }
        res.advice = advice;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeAdvice(res.advice));
  });

module.exports = adviceRouter;
