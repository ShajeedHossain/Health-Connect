const jwt = require("jsonwebtoken");
const AppointmentTaken = require("../model/appointmentTakenModel");
const mongoose = require("mongoose");
const { generateSerial, sendEmail } = require("../utilities/utilities");

const addAppointment = async (req, res) => {
  const {
    doctorId,
    startTime,
    hospitalId,
    shift,
    doctor_name,
    contact,
    appointment_fees,
    address,
    hospital_name,
    specializations,
    patient_email,
    // district,
    // town,
  } = req.body;

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const start = new Date(startTime);

    // //the id needs to be somehow received to get the name from the doctor schema
    const docId = new mongoose.Types.ObjectId(doctorId); //may change
    const hosId = new mongoose.Types.ObjectId(hospitalId); //may change

    const count = await generateSerial(start, docId);

    // Calculate the serial number
    const serial = count + 1;
    console.log(req.body);
    const appointment = await AppointmentTaken.addAppointment(
      docId,
      _id,
      start,
      hosId,
      serial,
      shift
    );
    res.status(201).json({ appointment });

    const subject = "Health-Connect appointment confirmation";
    const message = `Thank you for using our services. Your appointment has been confirmed.\n\n`;
    const otherMessage = `Doctor Name: ${doctor_name}\nContact: ${contact}\nHospital Name: ${hospital_name}\nAddress: ${
      address.town
    }, ${address.district}\nSpecializations: ${specializations
      .map((val) => val)
      .join(", ")}\nFees: ${appointment_fees}`;
    sendEmail(patient_email, subject, message + otherMessage);
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      error: error.message,
    });
  }
};

const getPreviousAppointments = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const previousAppointment = await AppointmentTaken.getPreviousAppointments(
      new mongoose.Types.ObjectId(_id)
    );

    res.status(200).json({ previousAppointment });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getUpcomingAppointments = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const upcomingAppointment = await AppointmentTaken.getUpcomingAppointments(
      new mongoose.Types.ObjectId(_id)
    );

    res.status(200).json({ upcomingAppointment });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const doctorUpcomingAppointments = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(_id);

    const upcomingAppointment =
      await AppointmentTaken.doctorUpcomingAppointments(
        new mongoose.Types.ObjectId(_id)
      );

    res.status(200).json({ upcomingAppointment });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const doctorPreviousAppointments = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(_id);

    const previousAppointment =
      await AppointmentTaken.doctorPreviousAppointments(
        new mongoose.Types.ObjectId(_id)
      );

    res.status(200).json({ previousAppointment });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getDoctorAllAppointment = async (req, res) => {
  const { authorization, id } = req.headers;
  const token = authorization.split(" ")[1];

  try {
    let appointments;
    if (id) {
      appointments = await AppointmentTaken.find({ doctorId: id });
    } else {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET);

      appointments = await AppointmentTaken.find({ doctorId: _id });
    }

    if (!appointments) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addAppointment,
  getPreviousAppointments,
  getUpcomingAppointments,
  doctorUpcomingAppointments,
  doctorPreviousAppointments,
  getDoctorAllAppointment,
};
