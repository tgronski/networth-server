require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./errorHandler");
const adviceRouter = require("./advice/advice-router");
const calculationsRouter = require("./calculations/calculations-router");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const walletsRouter = require("./wallets/wallets-router");
const goalsRouter = require("./goals/goals-router");
const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/api/advice", adviceRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/calculations", calculationsRouter);
app.use("/api/wallets", walletsRouter);
app.use("/api/goals", goalsRouter);

app.use(errorHandler);

module.exports = app;
