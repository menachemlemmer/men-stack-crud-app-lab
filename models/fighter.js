const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  name: String,
  rank: Number,
  division: String,
  wins: Number,
  losses: Number,
  no_contest: Number,
});

const Fighter = mongoose.model("Fighter", fighterSchema);

module.exports = Fighter;
