const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
  hostname: String,
  url: String,
  id: String,
  username: String,
  email: String,
  role: {
    type: String,
    enum: {
      values: ["admin", "editor", "viewer", "user"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  requestDate: {
    type: Date,
    default: Date.now(),
  },
  type: {
    type: String,
    enum: {
      values: ["valid", "invalid"],
      message: "{VALUE} is not supported",
    },
    default: "valid",
  },
});

module.exports = mongoose.model("Log", logSchema);
