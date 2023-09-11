// const jwt = require("jsonwebtoken");
// const User = require("../model/userModel");
const Doctor = require("../model/doctorModel");
// const { formatDate } = require("../utilities/utilities.js");

// fullName,
// hospitalName, //given by admin of the hospital
// hospitalId, //given by admin of the hospital
// dob,
// education,
// gender,
// contact

const createDoctorSignup = async (req, res) => {
  const {
    email,
    fullname,
    hospitalName,
    dob,
    hospitalId,
    gender,
    contact,
    education,
    specializations,
  } = req.body;
  //   const { authorization } = req.headers;
  //   const token = authorization.split(" ")[1];
  const specializationsList = specializations.split(",");
  try {
    // const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const newDoctor = await Doctor.addOneDoctor(
      fullname,
      hospitalName,
      hospitalId,
      dob,
      education,
      gender,
      contact,
      email,
      specializationsList
    );
    console.log(newDoctor);
    res.status(201).json({ email, newDoctor });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  createDoctorSignup,
};
