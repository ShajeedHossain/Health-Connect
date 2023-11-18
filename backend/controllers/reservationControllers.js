const jwt = require("jsonwebtoken");
const Reservation = require("../model/reservationModel");
const Hospital = require("../model/hospitalModel");
const Patient = require("../model/patientModel");
const { sendEmail } = require("../utilities/utilities");

const addReservation = async (req, res) => {
  const {
    reservationType,
    reservationDate,
    hospitalId,
    additional_requirements,
    reservationCategory,
    reservationFee,
    ambulance_address,
    patient_email,
  } = req.body;

  // const { authorization } = req.headers;
  // const token = authorization.split(" ")[1];

  try {
    // const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const patient = await Patient.findOne({ email: patient_email });
    if (!patient) {
      throw Error("Patient account does not exist");
    }
    console.log(req.body);
    const reservation = await Reservation.addReservation(
      reservationType,
      hospitalId,
      patient._id,
      reservationDate,
      additional_requirements,
      reservationCategory,
      reservationFee,
      ambulance_address
    );
    console.log(reservation);
    res.status(200).json({ reservation });

    //Sending confirmation email
    const hospital = await Hospital.findById(hospitalId);
    const subject = "Health-Connect reservation confirmation";
    const message = `Thank you for using our services. Your reservation has been confirmed.\n\n`;

    const otherMessage = `Hospital Name: ${hospital.hospitalName}\nAddress: ${hospital.address.town}, ${hospital.address.district}\nReserved for: ${reservationDate}\nReservation Type: ${reservationType}\nReservation Category: ${reservationCategory}\nAdditional Requirements: ${additional_requirements}`;

    sendEmail(patient_email, subject, message + otherMessage);
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
    const previousReservations = await Reservation.findPreviousReservations(
      _id
    );

    res.status(200).json({ previousReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const patientPreviousReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const previousReservations = await Reservation.patientPreviousReservations(
      _id
    );

    res.status(200).json({ previousReservations });
  } catch (error) {
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
    const upcomingReservations = await Reservation.findUpcomingReservations(
      _id
    );

    res.status(200).json({ upcomingReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const patientUpcomingReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const upcomingReservations = await Reservation.patientUpcomingReservations(
      _id
    );

    res.status(200).json({ upcomingReservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const dischargePatient = async (req, res) => {
  const {
    reservationId,
    reservationType,
    reservationCategory,
    // reservationDate,
    // additional_requirements,
    // reservationFee,
    // ambulance_address,
    bill,
    patient_email,
  } = req.body;

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    //Updating the reservation status and saving the bill
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      {
        $set: {
          dischargeStatus: true,
          bill: bill,
        },
      },
      { new: true }
    );
    console.log(reservation);

    const hospital = await Hospital.findById(_id);
    if (
      reservationType.toLowerCase() === "cabin" ||
      reservationType.toLowerCase() === "cabins"
    ) {
      const categoryCabins = hospital.cabins.find(
        (cabin) => cabin.category === reservationCategory
      );
      console.log(categoryCabins);

      const remaining = categoryCabins.remaining;

      console.log(categoryCabins.remaining);
      const newCount = categoryCabins.remaining + 1;
      categoryCabins.remaining = Math.min(categoryCabins.count, newCount);
    } else {
      const categoryBeds = hospital.beds.find(
        (beds) => beds.category === reservationCategory
      );

      const remaining = categoryBeds.remaining;
      const newCount = categoryBeds.remaining + 1;
      categoryBeds.remaining = Math.min(categoryBeds.count, newCount);
    }

    await hospital.save();

    //Sending confirmation email
    const subject = "Health-Connect hospital discharge";
    const message = `Thank you for using our services. Your have been dischaged.\n\nHospital Name: ${hospital.hospitalName}\nBill Information:\n`;

    const otherMessage = Object.keys(bill)
      .map((key) => `${key}: ${bill[key]}`)
      .join(",\n");

    sendEmail(patient_email, subject, message + otherMessage);
    res.status(200).json({ reservation });
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getHospitalReservations = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const reservations = await Reservation.find({ hospitalId: _id });

    res.status(200).json({ reservations });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const reservationUpdate = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { reservationCategory, reservationType, reservationDate } = req.body;
  const reservationId = req.body._id;
  console.log("DATE: ", req.body);

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const prevReservation = await Reservation.findById(reservationId);
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      {
        $set: {
          reservationCategory: reservationCategory,
          reservationType: reservationType,
          reservationDate: reservationDate,
        },
      },
      { new: true }
    );

    if (
      reservationCategory !== prevReservation.reservationCategory ||
      reservationType !== prevReservation.reservationType
    ) {
      const hospital = await Hospital.findById(_id);
      //UPDATING PREVIOUS DATA
      if (
        prevReservation.reservationType.toLowerCase() === "cabin" ||
        prevReservation.reservationType.toLowerCase() === "cabins"
      ) {
        const categoryCabins = hospital.cabins.find(
          (cabin) => cabin.category === prevReservation.reservationCategory
        );

        const remaining = categoryCabins.remaining;

        const newCount = categoryCabins.remaining + 1;
        categoryCabins.remaining = Math.min(categoryCabins.count, newCount);
      } else {
        const categoryBeds = hospital.beds.find(
          (beds) => beds.category === prevReservation.reservationCategory
        );

        const remaining = categoryBeds.remaining;
        const newCount = categoryBeds.remaining + 1;
        categoryBeds.remaining = Math.min(categoryBeds.count, newCount);
      }
      await hospital.save();

      //UPDATING NEW DATA
      if (
        reservationType.toLowerCase() === "cabin" ||
        reservationType.toLowerCase() === "cabins"
      ) {
        const categoryCabins = hospital.cabins.find(
          (cabin) =>
            cabin.category.toLowerCase() === reservationCategory.toLowerCase()
        );

        const remaining = categoryCabins.remaining;

        const newCount = categoryCabins.remaining - 1;
        categoryCabins.remaining = Math.max(0, newCount);
      } else {
        const categoryBeds = hospital.beds.find(
          (beds) =>
            beds.category.toLowerCase() === reservationCategory.toLowerCase()
        );

        const remaining = categoryBeds.remaining;
        const newCount = categoryBeds.remaining - 1;
        categoryBeds.remaining = Math.max(0, newCount);
      }
      await hospital.save();
    }

    res.status(200).json({ reservation });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addReservation,
  findPreviousReservations,
  findUpcomingReservations,
  patientPreviousReservations,
  patientUpcomingReservations,
  dischargePatient,
  getHospitalReservations,
  reservationUpdate,
};
