const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema({
  url: { type: String, unique: true },
  name: { type: String },
  protocol: { type: String },
  path: { type: String },
  timeout: { type: Number, required: false },
  interval: { type: Number, required: false },
  threshold: { type: Number, required: false },
  tags: {
    type: [String],
    required: false,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  ignoreSSL: { type: String, required: true },
});

module.exports = mongoose.model("check", checkSchema);
