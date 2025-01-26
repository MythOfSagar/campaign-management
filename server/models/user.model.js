const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: false },
    name: { type: String, required: false },
    
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
