const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
});

module.exports = mongoose.model("user", userSchema);
