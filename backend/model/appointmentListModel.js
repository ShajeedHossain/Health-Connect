const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const appointmentListSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // This should match the name of  Doctor model
    required: true,
  },

  startTime: {
    type: Date, // Use the Date type to store start time
    required: true,
  },
  endTime: {
    type: Date, // Use the Date type to store end time
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // This should match the name of  Doctor model
    required: true,
  },
  address: addressSchema,
  available: {
    type: Boolean,
    default: true, // Set a default value (true for available, false for booked)
  },
  specializations: [
    {
      type: String,
    },
  ],
  // availableDays: [
  //   {
  //     type: String,
  //     enum: [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ],
  //   },
  // ],
});

// Define a static function for creating an appointment
appointmentListSchema.statics.createAppointmentList = async function (
  doctorName,
  doctorId,
  startTime,
  endTime,
  hospitalName,
  hospitalId,
  district,
  town,
  specializations
) {
  const address = {
    district,
    town,
  };
  try {
    const appointment = await this.create({
      doctorName,
      doctorId,
      startTime,
      endTime,
      hospitalName,
      address,
      hospitalId,
      specializations,
    });
    console.log(appointment);
    return appointment;
  } catch (error) {
    throw error;
  }
};

// Define a static function to get all future appointments
appointmentListSchema.statics.getAllAppointments = async function () {
  try {
    const currentDate = new Date();
    const appointments = await this.find({ startTime: { $gte: currentDate } });
    console.log(appointments);
    return appointments;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("AppointmentList", appointmentListSchema);
