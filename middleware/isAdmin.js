const User = require("../models/user")

module.exports= async(req,res,next)=>{
  let id = req.user.id
  if(!id) return res.status(401).json({message:"unauthorized id"})
  try {
    const user = await User.findById(id)
    if(user.role!=="admin") return res.status(401).json({message:"You are not admin"})
    next()
  } catch (error) {
    res.status(500).json({message:"Invalid token"})
  }
}