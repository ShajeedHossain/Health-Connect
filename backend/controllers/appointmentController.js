const jwt = require("jsonwebtoken");
const AppointmentList = require("../model/appointmentListModel");
const mongoose = require("mongoose");

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
    const docId = new mongoose.Types.ObjectId(doctorId);
    const hosId = new mongoose.Types.ObjectId(hospitalId);

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

    res.status(201).json({ appointmentList });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = { addToAppointmentList, getAllAppointments };
