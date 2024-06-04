require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const Fighter = require("./models/fighter");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/fighters/new", (req, res) => {
  res.send("Create new fighter here");
});

app.listen(3000, () => {
  console.log("Server is running");
});
