const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("deep-email-validator");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
});

// Function to add an admin using the create method
adminSchema.statics.addAdmin = async function (email, hospitalId, fullName) {
  if (!fullName || !hospitalId || !email) {
    throw Error("Fields can't be empty");
  }
  const exists = await this.findOne({ email });
  const userExists = await User.findOne({ email });

  if (exists || userExists) {
    throw Error("Email already in use");
  }
  const { valid } = await validate(email);
  if (!valid) {
    throw Error("Email is not valid");
  }

  const hosId = new mongoose.Types.ObjectId(hospitalId);
  try {
    const admin = await this.create({ email, hospitalId: hosId, fullName });
    const password = email + "A*123";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      fullname: fullName,
      type: "admin",
    });
    console.log(admin);
    return admin;
  } catch (error) {
    throw error;
  }
};

// Define the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
