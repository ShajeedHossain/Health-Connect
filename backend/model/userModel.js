const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { validate } = require("deep-email-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["patient", "doctor", "admin"],
    default: "patient", // Set "patient" as the default value
  },
});

//static signup method
userSchema.statics.signup = async function (
  email,
  password,
  fullname,
  address
) {
  if (!email || !password || !fullname || !address) {
    throw Error("All fields must be filled");
  }

  const { valid } = await validate(email);

  if (!valid) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hashedPassword,
    fullname,
    address,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const { valid } = await validate(email);

  if (!valid) {
    throw Error("Email is not valid");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid password");
  }

  return user;
};

//static email check for verification or other purposes
userSchema.statics.checkEmail = async function (email) {
  if (!email) {
    throw Error("All fields must be filled");
  }

  const { valid } = await validate(email);

  if (!valid) {
    throw Error("Email is not valid");
  }

  const user = await this.findOne({ email }).select("_id email");
  // console.log(user);

  if (!user) {
    throw Error("Incorrect email");
  }

  return user;
};

//static function for updating password
userSchema.statics.updatePassword = async function (password, id) {
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.findByIdAndUpdate(
    { _id: id },
    { password: hashedPassword }
  );
  // console.log(user);

  if (!user) {
    throw Error("Error while updating");
  }
  console.log("SUCCESS");

  return user;
};

module.exports = mongoose.model("User", userSchema);
