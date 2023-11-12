const jwt = require("jsonwebtoken");
const Reservation = require("../model/reservationModel");
const Hospital = require("../model/hospitalModel");
const Admin = require("../model/adminModel");
const mongoose = require("mongoose");
const { formatDate, sendEmail } = require("../utilities/utilities");

const addReservation = async (req, res) => {
  const {
    reservationType,
    reservationDate,
    hospitalId,
    additional_requirements,
    reservationCategory,
    reservationFee,
    ambulance_address,
    patient_email,
  } = req.body;

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(req.body);
    const reservation = await Reservation.addReservation(
      reservationType,
      hospitalId,
      _id,
      reservationDate,
      additional_requirements,
      reservationCategory,
      reservationFee,
      ambulance_address
    );
    console.log(reservation);
    res.status(200).json({ reservation });

    //Sending confirmation email
    const hospital = await Hospital.findById(hospitalId);
    const subject = "Health-Connect reservation confirmation";
    const message = `Thank you for using our services. Your reservation has been confirmed.\n\n`;

    const otherMessage = `Hospital Name: ${hospital.hospitalName}\nAddress: ${hospital.address.town}, ${hospital.address.district}\nReserved for: ${reservationDate}\nReservation Type: ${reservationType}\nReservation Category: ${reservationCategory}\nAdditional Requirements: ${additional_requirements}`;

    sendEmail(patient_email, subject, message + otherMessage);
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const findPreviousReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const previousReservations = await Reservation.findPreviousReservations(
      _id
    );

    res.status(200).json({ previousReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const patientPreviousReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const previousReservations = await Reservation.patientPreviousReservations(
      _id
    );

    res.status(200).json({ previousReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const findUpcomingReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const upcomingReservations = await Reservation.findUpcomingReservations(
      _id
    );

    res.status(200).json({ upcomingReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const patientUpcomingReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const upcomingReservations = await Reservation.patientUpcomingReservations(
      _id
    );

    res.status(200).json({ upcomingReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addReservation,
  findPreviousReservations,
  findUpcomingReservations,
  patientPreviousReservations,
  patientUpcomingReservations,
};
