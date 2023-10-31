const mongoose = require("mongoose");
const Hospital = require("../model/hospitalModel");
const { convertToDateObject } = require("../utilities/utilities");

// Define the Reservation schema
const reservationSchema = new mongoose.Schema({
    reservationType: {
        type: String,
        required: true,
    },
    reservationCategory: {
        type: String,
    },
    reservationFee: {
        type: Number,
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
    additional_requirements: [
        {
            type: String,
        },
    ],
    ambulance_address: {
        type: String,
        default: null,
    },
});

// Define the post-save middleware for the Reservation schema
// reservationSchema.pre("save", async function (next) {
//   const hospital = await Hospital.findById(this.hospitalId);

//   if (hospital.availableBeds - 1 < 0) {
//     return next(new Error("No available beds."));
//   }
//   if (hospital.availableCabins - 1 < 0) {
//     return next(new Error("No available cabins."));
//   }
//   const reservationCount = await Reservation.countDocuments({
//     hospitalId: this.hospitalId,
//     reservationType: this.reservationType,
//   });

//   if (this.reservationType === "bed") {
//     hospital.availableBeds = hospital.totalBeds - reservationCount - 1;
//   } else if (this.reservationType === "cabin") {
//     hospital.availableCabins = hospital.totalCabins - reservationCount - 1;
//   }

//   await hospital.save();
//   next();
// });

// // Define the post-save middleware for the Reservation schema
reservationSchema.pre("save", async function (next) {
    try {
        const hospital = await Hospital.findById(this.hospitalId);
        if (this.reservationType.toLowerCase() === "cabin" || "cabins") {
            const categoryCabins = hospital.cabins.find(
                (cabin) => cabin.category === this.reservationCategory
            );
            console.log(categoryCabins);

            const remaining = categoryCabins.remaining;
            if (remaining - 1 < 0) {
                return next(
                    new Error("No such cabins available at the moment.")
                );
            } else {
                console.log(categoryCabins.remaining);
                categoryCabins.remaining -= 1;
            }
        } else {
            const categoryBeds = hospital.beds.find(
                (beds) => beds.category === this.reservationCategory
            );
            // console.log(this.reservationCategory.toLowerCase());

            const remaining = categoryBeds.remaining;
            if (remaining - 1 < 0) {
                return next(new Error("No such beds available at the moment."));
            } else {
                categoryBeds.remaining -= 1;
            }
        }

        await hospital.save();
        next();
    } catch (err) {
        console.log(err.message);
        throw err;
    }
});

reservationSchema.statics.addReservation = async function (
    reservationType,
    hospitalId,
    patientId,
    reservationDate,
    additional_requirements,
    reservationCategory,
    reservationFee,
    ambulance_address
) {
    const hosId = new mongoose.Types.ObjectId(hospitalId);
    const patId = new mongoose.Types.ObjectId(patientId);
    const date = convertToDateObject(reservationDate);
    try {
        const exists = await this.findOne({
            patientId: patId,
            reservationDate: date,
        });
        if (exists) {
            throw Error("Reservation already exist at this date");
        }
        console.log(additional_requirements);
        const reservation = await this.create({
            reservationType,
            hospitalId: hosId,
            patientId: patId,
            reservationDate: date,
            additional_requirements: additional_requirements.split(","),
            reservationCategory,
            reservationFee,
            ambulance_address,
        });
        console.log(reservation);
        return reservation;
    } catch (error) {
        throw error;
    }
};

reservationSchema.statics.findPreviousReservations = async function (
    hospitalId
) {
    try {
        const hosId = new mongoose.Types.ObjectId(hospitalId);
        const reservations = await this.find({
            hospitalId: hosId,
            reservationDate: { $lt: new Date() },
        })
            .populate("hospitalId", "hospitalName address")
            .populate("patientId", "fullName")
            .exec();
        console.log(reservations);
        return reservations;
    } catch (error) {
        throw error;
    }
};

reservationSchema.statics.patientPreviousReservations = async function (
    patientId
) {
    try {
        const patId = new mongoose.Types.ObjectId(patientId);
        const reservations = await this.find({
            patientId: patId,
            reservationDate: { $lt: new Date() },
        })
            .populate("hospitalId", "hospitalName address")
            .populate("patientId", "fullName")
            .exec();
        console.log(reservations);
        return reservations;
    } catch (error) {
        throw error;
    }
};

reservationSchema.statics.findUpcomingReservations = async function (
    hospitalId
) {
    try {
        const hosId = new mongoose.Types.ObjectId(hospitalId);

        const reservations = await this.find({
            hospitalId: hosId,
            reservationDate: { $gt: new Date() },
        })
            .populate("hospitalId", "hospitalName address")
            .populate("patientId", "fullName")
            .exec();
        console.log(reservations);
        return reservations;
    } catch (error) {
        throw error;
    }
};

reservationSchema.statics.patientUpcomingReservations = async function (
    patientId
) {
    try {
        const patId = new mongoose.Types.ObjectId(patientId);
        const reservations = await this.find({
            patientId: patId,
            reservationDate: { $gt: new Date() },
        })
            .populate("hospitalId", "hospitalName address")
            .populate("patientId", "fullName")
            .exec();
        console.log(reservations);
        return reservations;
    } catch (error) {
        throw error;
    }
};

// Define the Reservation model
const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
