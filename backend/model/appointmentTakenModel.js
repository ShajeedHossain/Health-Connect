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
});

// appointmentTakenSchema.pre("save", async function (next) {
//   const currentDate = new Date();
//   const appointmentDate = this.startTime;
//   const doctorId = this.doctorId;

//   try {
//     // Check if the appointment date is the same as the current date
//     if (
//       appointmentDate.getDate() === currentDate.getDate() &&
//       appointmentDate.getMonth() === currentDate.getMonth() &&
//       appointmentDate.getFullYear() === currentDate.getFullYear()
//     ) {
//       // Find the count of appointments taken by the specific doctor on the same day
//       const count = await this.model("AppointmentTaken").countDocuments({
//         startTime: {
//           $gte: new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate(),
//             0,
//             0,
//             0
//           ),
//           $lt: new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             currentDate.getDate() + 1,
//             0,
//             0,
//             0
//           ),
//         },
//         doctorId: doctorId,
//       });
//       console.log(count);

//       // Increment the serial number
//       this.serial = count + 1;
//     } else {
//       // New day, reset the serial to 1
//       this.serial = 1;
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

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
  serial
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
    };

    const appointment = await this.create(appointmentData);

    // Implement any additional logic if needed
    // console.log(appointment);

    return appointment;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("AppointmentTaken", appointmentTakenSchema);
