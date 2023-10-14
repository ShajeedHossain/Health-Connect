const jwt = require("jsonwebtoken");
const Reservation = require("../model/reservationModel");
const Admin = require("../model/adminModel");
const mongoose = require("mongoose");

const addReservation = async (req, res) => {
  const { reservationType, reservationDate, hospitalId } = req.body;

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const reservation = await Reservation.addReservation(
      reservationType,
      hospitalId,
      _id,
      reservationDate
    );
    console.log(reservation);
    res.status(200).json({ reservation });
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
    // const reservation = await Admin.findById(new mongoose.Types.ObjectId(_id));
    const previousReservations = await Reservation.findPreviousReservations(
      _id
    );

    res.status(200).json({ previousReservations });
  } catch (error) {
    // console.log(error);
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
    // const reservation = await Admin.findById(new mongoose.Types.ObjectId(_id));
    // console.log(_id);
    const upcomingReservations = await Reservation.findUpcomingReservations(
      _id
    );
    // console.log(upcomingReservations);

    res.status(200).json({ upcomingReservations });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addReservation,
  findPreviousReservations,
  findUpcomingReservations,
};
