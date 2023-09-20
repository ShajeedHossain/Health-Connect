const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const appointmentTakenSchema = new mongoose.Schema({
  doctorId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // This should match the name of  Doctor model
    required: true,
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
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // This should match the name of Hospital model
  },
  // address: addressSchema,
  isTaken: {
    type: Boolean,
    default: false, // Set a default value to false
  },
});

// Define a custom validation function to check for duplicate appointments
// Maybe need to check if appointments with other doctors also exist
appointmentTakenSchema.pre("validate", async function (next) {
  try {
    const existingAppointment = await this.constructor.findOne({
      doctorId: this.doctorId,
      patientId: this.patientId,
      startTime: this.startTime,
    });

    if (existingAppointment) {
      const errorMessage = "An appointment already exists.";
      this.invalidate("startTime", errorMessage);
      return next(new Error(errorMessage));
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Define a static function for adding an appointment
appointmentTakenSchema.statics.addAppointment = async function (
  doctorId,
  patientId,
  startTime,
  hospitalId,
  serial
) {
  // const address = {
  //   district,
  //   town,
  // };
  try {
    const appointmentData = {
      doctorId,
      patientId,
      startTime,
      hospitalId,
      // address,
      serial,
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
