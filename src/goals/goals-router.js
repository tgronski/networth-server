const path = require("path");
const knex = require("knex");
require("dotenv").config();
const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth')
const GoalsService = require("./goals-service");

const goalsRouter = express.Router();
const jsonParser = express.json();

const serializeGoals = goal => ({
  id: goal.id,
  user_id: goal.user_id,
  goal_name: goal.name,
  goal_value: goal.value,
});


goalsRouter
.route("/")
.all(requireAuth)
.get((req, res, next) => {
  user_id=req.user.id
  const knexInstance = req.app.get("db");
  GoalsService.getGoals(knexInstance,user_id)

    .then(results => {
      res.status(200).json(results);
    })
    .catch(next);
})
.post(requireAuth, jsonParser, (req, res, next) => {
    const {
        goal_name,
        goal_value
    } = req.body;
    const newGoal = {
        goal_name,
        goal_value
    };
    for (const [key, value] of Object.entries(newGoal)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request` }
        });
      }
    }
    newGoal.user_id = req.user.id


    GoalsService.insertGoal(req.app.get("db"), newGoal)
      .then(goal => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${goal.id}`))
          .json(serializeGoals(goal));
      })
      .catch(next);
  });
goalsRouter
  .route("/:id")
  .all(requireAuth)
  .all((req, res, next) => {
    GoalsService.getById(req.app.get("db"), req.params.id)
      .then(goal => {
        if (!goal) {
          return res.status(404).json({
            error: { message: `Entry doesn't exist` }
          });
        }
        res.goal = goal;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeGoals(res.goal));
  })
  .delete(requireAuth, (req, res, next) => {
    GoalsService.deleteGoals(req.app.get("db"), req.params.id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })


module.exports = goalsRouter;
