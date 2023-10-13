const mongoose = require("mongoose");
const Hospital = require("../model/hospitalModel");
const { convertToDateObject } = require("../utilities/utilities");

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
    default: Date.now, //set to default null can be changed if added
    required: true,
  },
});

// Define the post-save middleware for the Reservation schema
reservationSchema.pre("save", async function (next) {
  const hospital = await Hospital.findById(this.hospitalId);

  if (hospital.availableBeds - 1 < 0) {
    return next(new Error("No available beds."));
  }
  if (hospital.availableCabins - 1 < 0) {
    return next(new Error("No available cabins."));
  }
  const reservationCount = await Reservation.countDocuments({
    hospitalId: this.hospitalId,
    reservationType: this.reservationType,
  });

  if (this.reservationType === "bed") {
    hospital.availableBeds = hospital.totalBeds - reservationCount - 1;
  } else if (this.reservationType === "cabin") {
    hospital.availableCabins = hospital.totalCabins - reservationCount - 1;
  }

  await hospital.save();
  next();
});

reservationSchema.statics.addReservation = async function (
  reservationType,
  hospitalId,
  patientId,
  reservationDate
) {
  const hosId = new mongoose.Types.ObjectId(hospitalId);
  const patId = new mongoose.Types.ObjectId(patientId);
  const date = convertToDateObject(reservationDate);
  try {
    const reservation = await this.create({
      reservationType,
      hospitalId: hosId,
      patientId: patId,
      reservationDate: date,
    });
    return reservation;
  } catch (error) {
    throw error;
  }
};

// Define the Reservation model
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
