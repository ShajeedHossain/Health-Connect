const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");
const doctorModel = require("./doctorModel");

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
    shift: {
        type: String,
    },
    prescription: {
        type: mongoose.Schema.Types.Mixed,
    },
});

// Define a custom validation function to check for duplicate appointments
// Maybe need to check if appointments with other doctors also exist
//Also if two persons take appointment of same doctor at the same time
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
    serial,
    shift
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
            shift,
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
        const previousAppointments = await this.aggregate([
            {
                $match: {
                    patientId: patientId,
                    startTime: { $lt: currentDate },
                    isTaken: true,
                },
            },
            {
                $lookup: {
                    from: "doctors", // Name of the Doctor collection
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctorData",
                },
            },
            {
                $unwind: "$doctorData", // Convert doctorData array to object
            },
            {
                $project: {
                    _id: 1,
                    doctorId: 1,
                    serial: 1,
                    startTime: 1,
                    hospitalId: 1,
                    isTaken: 1,
                    doctorName: "$doctorData.fullName",
                    hospitalName: "$doctorData.hospitalName",
                    specializations: "$doctorData.specializations",
                    address: "$doctorData.address",
                },
            },
            {
                $sort: { startTime: -1 }, // Sorting by endTime in descending order
            },
        ]);
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

        const upcomingAppointments = await this.aggregate([
            {
                $match: {
                    patientId: patientId,
                    startTime: { $gt: currentDate },
                    isTaken: false,
                },
            },
            {
                $lookup: {
                    from: "doctors", // Name of the Doctor collection
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctorData",
                },
            },
            {
                $unwind: "$doctorData", // Convert doctorData array to object
            },
            {
                $project: {
                    _id: 1,
                    doctorId: 1,
                    serial: 1,
                    startTime: 1,
                    hospitalId: 1,
                    isTaken: 1,
                    doctorName: "$doctorData.fullName",
                    hospitalName: "$doctorData.hospitalName",
                    specializations: "$doctorData.specializations",
                    address: "$doctorData.address",
                },
            },
            {
                $sort: { startTime: 1 }, // Sorting by endTime in descending order
            },
        ]);
        console.log(upcomingAppointments);
        return upcomingAppointments;
    } catch (error) {
        throw error;
    }
};

appointmentTakenSchema.statics.doctorUpcomingAppointments = async function (
    doctorId
) {
    try {
        const docId = new mongoose.Types.ObjectId(doctorId);
        const appointments = await this.find({
            doctorId: docId,
            startTime: { $gt: new Date() }, // Find reservations with a date in the future
        })
            .populate("hospitalId", "name")
            .populate("patientId", "name")
            .exec();
        console.log(appointments);
        return appointments;
    } catch (error) {
        throw error;
    }
};

appointmentTakenSchema.statics.doctorPreviousAppointments = async function (
    doctorId
) {
    try {
        const docId = new mongoose.Types.ObjectId(doctorId);
        const appointments = await this.find({
            doctorId: docId,
            startTime: { $lt: new Date() }, // Find reservations with a date in the future
        })
            .populate("hospitalId", "name")
            .populate("patientId", "name")
            .exec();
        console.log(appointments);
        return appointments;
    } catch (error) {
        throw error;
    }
};

module.exports = mongoose.model("AppointmentTaken", appointmentTakenSchema);
