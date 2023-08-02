const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User");

const authConfig = require("../config/auth.config");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(401).json({ error: 'Email allready registred' })
    }

    const newUser = new UserModel({ email, name, password });

    await newUser.save();

    return res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const accessToken = jwt.sign({ email: user.email }, authConfig.ACCESS_JWT_SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ email: user.email }, authConfig.REFRESH_JWT_SECRET_KEY, { expiresIn: "2h" });

    const date = new Date();

    res.cookie('access_token', accessToken, {
      expires: new Date(date.getTime() + authConfig.jwtExpiration)
    });
    res.cookie('name', `${user.name}`, {
      expires: new Date(date.getTime() + 3600000)
    });
    res.cookie('email', `${user.email}`, {
      expires: new Date(date.getTime() + 3600000)
    });
    res.cookie('password', `${user.password}`, {
      expires: new Date(date.getTime() + 3600000)
    }); 

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Login failed.' });
  }
}

module.exports = { register, login };