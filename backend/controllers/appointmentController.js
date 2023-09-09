const jwt = require("jsonwebtoken");
const AppointmentList = require("../model/appointmentListModel");
const AppointmentTaken = require("../model/appointmentTakenModel");
const mongoose = require("mongoose");
const { generateSerial } = require("../utilities/utilities");

const addToAppointmentList = async (req, res) => {
  const {
    doctorName,
    doctorId,
    startTime,
    endTime,
    hospitalName,
    hospitalId,
    district,
    town,
  } = req.body;

  try {
    const start = new Date(startTime);
    const end = new Date(endTime);

    //the id needs to be somehow received to get the name from the doctor schema
    const docId = new mongoose.Types.ObjectId(doctorId); //may change
    const hosId = new mongoose.Types.ObjectId(hospitalId); //may change

    const appointment = await AppointmentList.createAppointmentList(
      doctorName,
      docId,
      start,
      end,
      hospitalName,
      hosId,
      district,
      town
    );

    res.status(201).json({ appointment });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointmentList = await AppointmentList.getAllAppointments();
    console.log(appointmentList);

    res.status(200).json({ appointmentList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const addAppointment = async (req, res) => {
  const {
    doctorName,
    doctorId,
    patientName,
    // patientId,
    startTime,
    endTime,
    hospitalName,
    hospitalId,
    district,
    town,
  } = req.body;

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const start = new Date(startTime);
    const end = new Date(endTime);

    // //the id needs to be somehow received to get the name from the doctor schema
    const docId = new mongoose.Types.ObjectId(doctorId); //may change
    const hosId = new mongoose.Types.ObjectId(hospitalId); //may change

    const count = await generateSerial(start, docId);

    // Calculate the serial number
    const serial = count + 1;

    const appointment = await AppointmentTaken.addAppointment(
      doctorName,
      docId,
      patientName,
      _id,
      start,
      end,
      hospitalName,
      hosId,
      district,
      town,
      serial
    );

    res.status(201).json({ appointment });
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = { addToAppointmentList, getAllAppointments, addAppointment };
