const jwt = require("jsonwebtoken");
const Patient = require("../model/patientModel");
const Doctor = require("../model/doctorModel");
const {
  generateSerial,
  generatePatientCount,
} = require("../utilities/utilities");
// const { formatDate } = require("../utilities/utilities.js");

const addPatient = async (req, res) => {
  const { email, fullname, address, dob, height, weight, gender, contact } =
    req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    let user = await Patient.addPatient(
      fullname,
      email,
      new Date(dob),
      weight,
      height,
      gender,
      contact,
      address,
      _id
    );

    res.status(201).json({ email, user });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const doctorList = await Doctor.getAllDoctor();
    console.log(doctorList);

    res.status(200).json({ doctorList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getSortedDoctorList = async (req, res) => {
  try {
    const doctorList = await Doctor.getAllDoctor();

    for (const doctor of doctorList) {
      const patientCount = await generatePatientCount(doctor._id); // May need to use generate serial for specific date
      doctor.patientCount = patientCount;
      Object.assign(doctor, { patientCount: patientCount });
      console.log("DOCTOR", doctor);
    }

    doctorList.sort((a, b) => b.patientCount - a.patientCount); //reverse to get ascending sort

    res.status(200).json({ doctorList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addPatient,
  getAllDoctor,
  getSortedDoctorList,
};
