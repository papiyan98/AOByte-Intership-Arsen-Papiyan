const mongoose = require("mongoose");

const { hashPassword } = require("../middlewares/userMiddleware");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.pre('save', hashPassword);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;