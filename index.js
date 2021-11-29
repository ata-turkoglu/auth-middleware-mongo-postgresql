const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const auth = require("./middleware/auth");
const isAdmin = require("./middleware/isAdmin");
const isEditor = require("./middleware/isEditor");
const log = require("./middleware/log");

const user = require("./router/user");
const dbrouter = require("./db/dbrouter");

dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/salaries", auth, isAdmin, dbrouter.salaries.getAll);
app.use("/employees", auth, isEditor, log, dbrouter.employees.getAll);

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
