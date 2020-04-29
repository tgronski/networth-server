const path = require("path");
const knex = require("knex");
require("dotenv").config();
const express = require("express");
const { requireAuth } = require('../middleware/jwt-auth')
const CalculationsService = require("./calculations-service");

const calculationsRouter = express.Router();
const jsonParser = express.json();

const serializeCalculations = calculation => ({
  calculationsid: calculation.id,
  calculationsuserid: calculation.user_id,
  total: calculation.networth_total,
  total_value: calculation.networth_total_value,
  calculationsdate: calculation.date_created
});


calculationsRouter
.route("/")
.all(requireAuth)
.get((req, res, next) => {
  user_id=req.user.id
  const knexInstance = req.app.get("db");
  
  CalculationsService.getCalculations(knexInstance,user_id)

    .then(results => {
      res.status(200).json(results);
    })
    .catch(next);
})
.post(requireAuth, jsonParser, (req, res, next) => {
    const {
        networth_loans,
        networth_credits,
        networth_savings, 
        networth_investments,
        networth_total,
        networth_total_value
    } = req.body;
    const newCalculation = {
      networth_loans,
      networth_credits,
      networth_savings, 
      networth_investments,
      networth_total,
      networth_total_value
    };
    for (const [key, value] of Object.entries(newCalculation)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request` }
        });
      }
    }
    user_id = req.user.id


    CalculationsService.insertCalculation(req.app.get("db"), newCalculation)
      .then(calculation => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${calculation.calculationsid}`))
          .json(serializeCalculations(calculation));
      })
      .catch(next);
  });
calculationsRouter
  .route("/:calculationsid")
  .all(requireAuth)
  .all((req, res, next) => {
    CalculationsService.getById(req.app.get("db"), req.params.calculationsid)
      .then(calculation => {
        if (!calculation) {
          return res.status(404).json({
            error: { message: `Advice doesn't exist` }
          });
        }
        res.calculation = calculation;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeCalculations(res.calculation));
  })
  .delete(requireAuth, (req, res, next) => {
    CalculationsService.deleteCalculation(req.app.get("db"), req.params.calculationsid)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth,jsonParser,(req,res,next)=>{
    const {
        id,
        user_id,
        networth_total,
        networth_total_value} = req.body
    const today= new Date();
    const date_created=today.getFullYear()+'/'+(today.getMonth()+1)+'/'+(today.getDate()-1);
    const editCalculation = {
        id,
        user_id,
        networth_total,
        networth_total_value, 
        date_created}
    
    for( const [key,value] of Object.entries(editCalculation))
    if(value==null)
    res.status(400).json({error:{message: `Missing ${key}`}})

    CalculationsService.updateCalculation(req.app.get("db"), req.params.calculationsid, editCalculation)
    .then(editedCalculation=>{
      res.status(200).json(serializeCalculations(editedCalculation[0]))
    })
    .catch(next);
  })


module.exports = calculationsRouter;
