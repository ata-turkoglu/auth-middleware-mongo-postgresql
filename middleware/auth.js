const { request } = require("express");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");
  if (!token) return res.status(401).json({ messeage: "unauthorized user" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      id: decoded.user.id,
    };
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
