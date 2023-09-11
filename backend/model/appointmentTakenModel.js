const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const appointmentTakenSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // This should match the name of  Doctor model
    required: true,
  },
  patientName: {
    type: String,
    default: null,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // This should match the name of User model
    required: true,
  },
  serial: {
    type: Number,
    required: true,
    default: 0,
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
    ref: "Hospital", // This should match the name of Hospital model
    required: true,
  },
  address: addressSchema,
  isTaken: {
    type: Boolean,
    default: false, // Set a default value to false
  },
  specializations: [
    {
      type: String,
    },
  ],
});

// Define a static function for adding an appointment
appointmentTakenSchema.statics.addAppointment = async function (
  doctorName,
  doctorId,
  patientName,
  patientId,
  startTime,
  endTime,
  hospitalName,
  hospitalId,
  district,
  town,
  serial,
  specializations
) {
  const address = {
    district,
    town,
  };
  try {
    const appointmentData = {
      doctorName,
      doctorId,
      patientName,
      patientId,
      startTime,
      endTime,
      hospitalName,
      hospitalId,
      address,
      serial,
      specializations,
    };

    const appointment = await this.create(appointmentData);

    // Implement any additional logic if needed
    // console.log(appointment);

    return appointment;
  } catch (error) {
    throw error;
  }
};

appointmentTakenSchema.statics.getPreviousAppointments = async function (
  patientId
) {
  try {
    const currentDate = new Date();

    // Find appointments where the patientId matches and the endTime is earlier than the current date
    const previousAppointments = await this.find({
      patientId: patientId,
      endTime: { $lt: currentDate },
    })
      .select({ patientName: 0, patientId: 0 })
      .sort({ endTime: -1 }) // Sorting by endTime in descending order
      .exec();
    console.log(previousAppointments);

    return previousAppointments;
  } catch (error) {
    throw error;
  }
};

appointmentTakenSchema.statics.getUpcomingAppointments = async function (
  patientId
) {
  try {
    const currentDate = new Date();

    // Find appointments where the patientId matches and the startTime is later than the current date
    const upcomingAppointments = await this.find({
      patientId: patientId,
      endTime: { $gt: currentDate },
    })
      .select({ patientName: 0, patientId: 0 })
      .sort({ endTime: 1 }) // Sorting by startTime in ascending order
      .exec();

    console.log(upcomingAppointments);
    return upcomingAppointments;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("AppointmentTaken", appointmentTakenSchema);
