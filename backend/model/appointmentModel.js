const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Doctor", // This should match the name of  Doctor model
    // required: true,
    type: String,
    required: true,
  },
  date: {
    type: Date, // Store the appointment date
    required: true,
  },
  serial: {
    type: Number,
    required: true,
  },
  patientId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Doctor", // This should match the name of  Doctor model
    // required: true,
    type: String,
    required: true,
  },
});

appointmentSchema.pre("save", function (next) {
  const currentDate = new Date();
  const appointmentDate = new Date(this.date);

  // Check if the appointment date is the same as the current date
  if (
    appointmentDate.getDate() === currentDate.getDate() &&
    appointmentDate.getMonth() === currentDate.getMonth() &&
    appointmentDate.getFullYear() === currentDate.getFullYear()
  ) {
    // Same day, increment the serial number
    this.model("Appointment")
      .countDocuments({ date: this.date })
      .exec()
      .then((count) => {
        this.serial = count + 1;
        next();
      })
      .catch((err) => {
        next(err);
      });
  } else {
    // New day, reset the serial to 1
    this.serial = 1;
    next();
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
