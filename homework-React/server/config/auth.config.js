module.exports = {
  ACCESS_JWT_SECRET_KEY: process.env.ACCESS_JWT_SECRET || "accesssjwtsecretkey",
  REFRESH_JWT_SECRET_KEY: process.env.REFRESH_JWT_SECRET || "refreshjwtsecretkey",
  jwtExpiration: 900000,
  jwtRefreshExpiration: 1000000,
};