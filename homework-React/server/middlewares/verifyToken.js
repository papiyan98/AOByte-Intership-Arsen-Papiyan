const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.config");

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;

    const payload = jwt.verify(accessToken, authConfig.ACCESS_JWT_SECRET_KEY);

    if (!payload) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    next();
  } catch (error) {
    res.status(401).json("Please authenticate");
  }
};

module.exports = verifyToken;