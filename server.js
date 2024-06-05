require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const Fighter = require("./models/fighter");
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/fighters", async (req, res) => {
  const allFighters = await Fighter.find({});
  res.render("fighters/index.ejs", { fighters: allFighters });
});

app.get("/fighters/new", (req, res) => {
  res.render("fighters/new.ejs");
});

app.get("/fighters/:fighterId", async (req, res) => {
  const foundFighter = await Fighter.findById(req.params.fighterId);
  res.render("fighters/show.ejs", { fighter: foundFighter });
});

app.get("/fighters/:fighterId/edit", async (req, res) => {
  const foundFighter = await Fighter.findById(req.params.fighterId);
  res.render("fighters/edit.ejs", {
    fighter: foundFighter,
  });
});

app.post("/fighters", async (req, res) => {
  req.body.isActive = !!req.body.isActive;
  await Fighter.create(req.body);
  res.redirect("/fighters");
});

app.delete("/fighters/:fighterId", async (req, res) => {
  await Fighter.findByIdAndDelete(req.params.fighterId);
  res.redirect("/fighters");
});

app.put("/fighters/:fighterId", async (req, res) => {
  req.body.isActive = !!req.body.isActive;
  await Fighter.findByIdAndUpdate(req.params.fighterId, req.body);
  res.redirect(`/fighters/${req.params.fighterId}`);
});

app.listen(3000, () => {
  console.log("Server is running");
});
