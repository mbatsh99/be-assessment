const mongoose = require("mongoose");

const pingSchema = new mongoose.Schema({
  url: { type: String, required: true },
  status: { type: Number, required: true },
  responseTime: { type: Number, required: true },
  check: { type: mongoose.Schema.Types.ObjectId, ref: "Check", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ping", pingSchema);
