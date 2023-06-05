const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema({
  url: { type: String },
  name: { type: String },
  protocol: { type: String },
  path: { type: String },
  timeout: { type: Number, required: false },
  interval: { type: Number, required: false },
  threshold: { type: Number, required: false },
  tags: [
    {
      tag: { type: String },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  ignoressl: { type: String, required: true },
});

module.exports = mongoose.model("check", checkSchema);
