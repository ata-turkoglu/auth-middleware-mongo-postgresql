const router = require("express").Router();
const Log = require("../models/log");

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(201).json({ logs });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
