const mongoose = require("mongoose");

const fighterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: Number,
  division: { type: String, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  no_contest: { type: Number, required: true },
  isActive: { type: Boolean, required: true },
  image: String,
});

const Fighter = mongoose.model("Fighter", fighterSchema);

module.exports = Fighter;
