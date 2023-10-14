const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  address: addressSchema,
  availableBeds: {
    type: Number,
    default: function () {
      return this.totalBeds || 0; // Default to 0 if totalBeds is not set
    },
  },
  availableCabins: {
    type: Number,
    default: function () {
      return this.totalCabins || 0; // Default to 0 if totalCabins is not set
    },
  },
  totalBeds: {
    type: Number,
    required: true,
  },
  totalCabins: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Define a static method to add a hospital
hospitalSchema.statics.addHospital = async function (
  hospitalName,
  district,
  town,
  totalBeds,
  totalCabins,
  availableBeds,
  availableCabins,
  email,
  password
) {
  const address = {
    district,
    town,
  };
  try {
    if (
      !hospitalName ||
      !district ||
      !totalBeds ||
      !totalCabins ||
      !email ||
      !password
    ) {
      throw Error("Fields can't be empty");
    }
    if (!validator.isEmail(email)) {
      throw Error("Not valid email");
    }

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    }

    // Check if a hospital with the same name and address exists
    const existingHospital = await this.findOne({
      hospitalName,
      address,
    });

    if (existingHospital) {
      throw new Error(
        "Hospital with the same name and address already exists."
      );
    }

    const exists = await this.findOne({ email });
    const userExist = await User.findOne({ email });

    if (exists || userExist) {
      throw Error("Email already in use");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const hospital = await this.create({
      hospitalName,
      address,
      totalBeds,
      totalCabins,
      availableBeds,
      availableCabins,
      email,
    });

    const user = await User.create({
      _id: hospital._id,
      email,
      password: hashedPassword,
      fullname: hospitalName,
      type: "hospital",
    });

    return hospital;
  } catch (error) {
    throw error;
  }
};

// Define a static method to get a list of hospitals
hospitalSchema.statics.getAllHospital = async function () {
  try {
    const hospitals = await this.find({});
    return hospitals;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Hospital", hospitalSchema);
