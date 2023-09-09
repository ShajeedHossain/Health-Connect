const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    // lowercase: true,
  },
  dob: {
    type: Date,
    required: true,
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
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This should match the name of your User model
    required: true,
  },
  bmi: {
    type: Number,
    default: function () {
      if (this.weight && this.height) {
        // Calculate BMI if both weight and height are provided
        const heightInMeters = this.height / 100; // Convert height to meters
        return this.weight / (heightInMeters * heightInMeters);
      }
      return null; // BMI is not calculated if data is missing
    },
  },
  age: {
    type: Number,
    default: function () {
      if (this.dob) {
        // Calculate age based on date of birth
        const today = new Date();
        const birthDate = new Date(this.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age;
      }
      return null; // Age is not calculated if date of birth is missing
    },
  },
});

// Import required modules and define patientSchema...

patientSchema.statics.addPatient = async function (
  fullName,
  email,
  dob,
  weight,
  height,
  gender,
  contact,
  address,
  userId
) {
  if (height < 0 || weight < 0) {
    throw Error("Negative height or weight are not allowed");
  }
  if (!validator.isMobilePhone(contact, "bn-BD")) {
    throw Error("Invalid phone number");
  }
  try {
    const patient = await this.create({
      fullName,
      email,
      dob,
      weight,
      height,
      gender,
      contact,
      address,
      userId,
    });

    return patient;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// Create the Patient model...

module.exports = mongoose.model("Patient", patientSchema);
