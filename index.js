const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("connected to MongoDB database.");
    }
  }
);

app.listen(process.env.MONGODB_PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(process.env.MONGODB_PORT + " listening...");
  }
});
