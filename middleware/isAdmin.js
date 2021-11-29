const User = require("../models/user")
const Log = require("../models/log");

module.exports= async(req,res,next)=>{
  try {
    const user = await User.findById(req.user.id)
    if (user.role=="admin") {
      next();
    } else {
      let log = new Log({
        hostname: req.headers.host,
        url: req.originalUrl,
        userId: id,
        username: user.username,
        email: user.email,
        age: user.age,
        role: user.role,
        type: "invalid",
      });
      await log.save();
      return res.status(401).json({ message: "Unauthorized request" });
    }
  } catch (error) {
    res.status(500).json({message:"Invalid token"})
  }
}