const jwt = require("jsonwebtoken");

const authConfig = require("../config/auth.config");

const refreshToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next();
  }

  jwt.verify(token, authConfig.ACCESS_JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return next();
    }

    const accessToken = jwt.sign({ email: decoded.email }, authConfig.ACCESS_JWT_SECRET_KEY, { expiresIn: "2h" });

    const date = new Date();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      expires: new Date(date.getTime() + authConfig.jwtExpiration)
    });

    next();
  })
};

module.exports = refreshToken;