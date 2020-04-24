require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorHandler')
const adviceRouter = require('./advice/advice-router')
const calculationsRouter = require('./calculations/calculations-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())
app.use(express.json());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('Authorization')
  console.log(apiToken)
  console.log(authToken)
  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
    next()
  })

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use("/api/advice", adviceRouter)

app.use("/api/calculations", calculationsRouter)
app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)

app.use(errorHandler)

module.exports = app