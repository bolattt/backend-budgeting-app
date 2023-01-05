const express = require("express");
const app = express.Router();
const transactions = require("../model/transactions");

app.get("/", (req, res) => {
  res.json(transactions);
});

app.get("/:index", (req, res) => {
  const { index } = req.params;
  if (transactions[index]) {
    res.json(transactions[index]);
  } else {
    res.status(404).json({ error: "Transaction not found at index " + index });
  }
});

app.post("/", (req, res) => {
  console.log(req.body);
  req.body.amount = Number(req.body.amount);
  transactions.push(req.body);
  res.send(transactions[transactions.length - 1]);
});

app.delete("/:index", (req, res) => {
  const { index } = req.params;
  if (transactions[index]) {
    transactions.splice(index, 1);
    res.send(transactions);
  } else {
    res.status(400).json({ error: "transaction not found at given index" });
  }
});

app.put("/:index", (req, res) => {
  const { index } = req.params;
  const data = req.body;

  if (transactions[index]) {
    transactions[index] = req.body;
    res.json(transactions[index]);
  } else {
    res
      .status(400)
      .json({ error: "Something went wrong when trying to update." });
  }
});

module.exports = app;
