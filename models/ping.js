const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  check: { type: Schema.Types.ObjectId, ref: "Check", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ping", userSchema);
