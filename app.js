const express = require("express");
const cors = require("cors");
const app = express();
const transactionsController = require("./controllers/transactionController");

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionsController);

app.get("/", (req, res) => {
  res.send("welcome to budgeting app");
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

module.exports = app;
