const Hospital = require("../model/hospitalModel");
const Doctor = require("../model/doctorModel");
const jwt = require("jsonwebtoken");
const { convertTimeToDateTime } = require("../utilities/utilities");

const addHospital = async (req, res) => {
  const {
    hospitalName,
    district,
    town,
    // totalBeds,
    // totalCabins,
    // availableBeds,
    // availableCabins,
    cabins,
    beds,
    facilities,
    email,
    password,
    latitude,
    longitude,
  } = req.body;

  const facilitiesList = facilities.split(",");
  console.log(facilitiesList);

  try {
    const hospital = await Hospital.addHospital(
      hospitalName,
      district,
      town,
      //   totalBeds,
      //   totalCabins,
      //   availableBeds,
      //   availableCabins,
      cabins,
      beds,
      facilitiesList,
      email,
      password,
      latitude,
      longitude
    );

    res.status(201).json({ hospital });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getAllHospital = async (req, res) => {
  try {
    const hospitalList = await Hospital.getAllHospital();

    res.status(200).json({ hospitalList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createDoctorSignup = async (req, res) => {
  const {
    email,
    fullname,
    dob,
    gender,
    contact,
    education,
    specializations,
    bma_id,
    district,
    town,
    latitude,
    longitude,
    appointment_fees,
    morning_shift_time,
    evening_shift_time,
    available_days,
  } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const specializationsList = specializations.split(",");
  const available_daysList = available_days.split(",");
  console.log(available_daysList);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const hospital = await Hospital.findById({ _id });
    console.log("DOCTOR CONTROLLER");
    const doctor = await Doctor.addOneDoctor(
      fullname,
      _id,
      dob,
      education,
      gender,
      contact,
      email,
      specializationsList,
      bma_id,
      hospital.address,
      appointment_fees,
      convertTimeToDateTime(morning_shift_time),
      convertTimeToDateTime(evening_shift_time),
      available_daysList
    );
    console.log(doctor);
    res.status(200).json({ doctor });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getHospitalDoctors = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.getHospitalDoctors(_id);
    console.log(doctor);
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addHospital,
  getAllHospital,
  createDoctorSignup,
  getHospitalDoctors,
};
