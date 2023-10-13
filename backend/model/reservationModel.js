const mongoose = require("mongoose");

// Define the Reservation schema
const reservationSchema = new mongoose.Schema({
  reservationType: {
    type: String,
    enum: ["cabin", "bed"],
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  reservationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Define the Reservation model
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
