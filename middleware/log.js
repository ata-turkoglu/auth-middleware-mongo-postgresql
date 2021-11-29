const Log = require("../models/log");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    let log = new Log({
      hostname: req.headers.host,
      url: req.originalUrl,
      userId: req.user.id,
      username: user.username,
      email: user.email,
      age: user.age,
      role: user.role,
      type: "valid",
    });
    await log.save();
    next();
  } catch (err) {
    res.status(500).json({ err });
  }
};
