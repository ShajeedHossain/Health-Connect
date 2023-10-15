const mongoose = require("mongoose");
const validator = require("validator");
// const User = require("../model/userModel");
const { calculateBMI, calculateAge } = require("../utilities/utilities");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
  },
  dob: {
    type: Date,
    // required: true,
  },
  weight: {
    type: Number,
    min: 0,
    default: null,
    // required: function () {
    //   return !!this.height; // Weight is required if height is provided
    // },
  },
  height: {
    type: Number,
    min: 0,
    default: null,
    // required: function () {
    //   return !!this.weight; // Height is required if weight is provided
    // },
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    // required: true,
  },
  contact: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  bmi: {
    type: Number,
    default: calculateBMI(this.height, this.weight),
  },
  age: {
    type: Number,
    default: calculateAge(this.dob),
  },
});

// Import required modules and define patientSchema...

patientSchema.statics.updatePatient = async function (
  fullName,
  email,
  dob,
  weight,
  height,
  gender,
  contact,
  address,
  _id
) {
  // const exists = await this.findOne({ email });
  // const user = await User.findOne({ email });

  // if (exists || user) {
  //   throw Error("Email already in use");
  // }
  console.log(_id);
  if (height < 0 || weight < 0) {
    throw Error("Negative height or weight are not allowed");
  }
  if (!validator.isMobilePhone(contact, "bn-BD")) {
    throw Error("Invalid phone number");
  }
  try {
    const result = await this.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      {
        $set: {
          height: height,
          weight: weight,
          fullName: fullName,
          bmi: calculateBMI(height, weight),
          // email: email,
          dob: dob,
          age: calculateAge(dob),
          gender: gender,
          contact: contact,
          address: address,
        },
      },
      { new: true } // Return the updated document
    );
    result.save();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// Create the Patient model...

module.exports = mongoose.model("Patient", patientSchema);
