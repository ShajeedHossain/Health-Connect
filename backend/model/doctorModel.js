const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../model/userModel");
const addressSchema = require("../model/addressSchema");
const Hospital = require("../model/hospitalModel");
const { validate } = require("deep-email-validator");
// const { formatDate } = require("../../utilities/utilities");

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // Replace with the actual name of your Hospital model
    // type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
    validate: {
      validator: function (dob) {
        const sixYearsAgo = new Date();
        sixYearsAgo.setFullYear(sixYearsAgo.getFullYear() - 6);
        return dob <= sixYearsAgo;
      },
      message: "Invalid DOB",
    },
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
  specializations: [
    {
      type: String,
    },
  ],
  address: addressSchema,
  bma_id: {
    type: String,
    required: true,
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

doctorSchema.statics.addOneDoctor = async function (
  fullName,
  hospitalId, //given by admin of the hospital
  dob,
  education,
  gender,
  contact,
  email,
  specializations,
  bma_id,
  district,
  town,
  latitude,
  longitude
) {
  if (
    !fullName ||
    !hospitalId ||
    !education ||
    !gender ||
    !education ||
    !specializations ||
    !bma_id
  ) {
    throw Error("Fields can't be empty");
  }
  const exists = await this.findOne({ email });
  const userExists = await User.findOne({ email });

  if (exists || userExists) {
    throw Error("Email already in use");
  }
  if (!validator.isMobilePhone(contact, "bn-BD")) {
    throw Error("Invalid phone number");
  }
  const { valid } = await validate(email);
  if (!valid) {
    throw Error("Email is not valid");
  }

  const hosId = new mongoose.Types.ObjectId(hospitalId);
  const address = {
    district,
    town,
    latitude,
    longitude,
  };

  try {
    const hospital = await Hospital.findById({ _id: hosId });
    const doctor = await this.create({
      fullName,
      email,
      dob,
      hospitalName: hospital.hospitalName, //given by admin of the hospital
      hospitalId: hosId, //given by admin of the hospital
      gender,
      contact,
      education,
      specializations,
      bma_id,
      address,
    });

    // console.log(doctor);

    const password = email + "D*123";

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough.");
    }
    const user = await User.signupDoctor(
      email,
      password,
      fullName,
      new mongoose.Types.ObjectId(doctor._id)
    );
    // console.log(user);
    return doctor;
    // return doctor;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// Define a static method to get a list of all doctors
doctorSchema.statics.getAllDoctor = async function () {
  try {
    const doctors = await this.find({}).lean(); //lean helps it to convert to js object
    return doctors;
  } catch (error) {
    throw error;
  }
};

// Define a static method to get a list of all doctors of a specific hospital
doctorSchema.statics.getHospitalDoctors = async function (hospitalId) {
  const hosId = new mongoose.Types.ObjectId(hospitalId);
  try {
    const doctors = await this.find({ hospitalId: hosId }).lean(); //lean helps it to convert to js object
    return doctors;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Doctor", doctorSchema);
