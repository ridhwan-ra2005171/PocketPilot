const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

//Hash Password before saving to db
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);