const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  const user = this;
  
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;