const jwt = require("jsonwebtoken");
const Patient = require("../model/patientModel");
// const { formatDate } = require("../utilities/utilities.js");

const addPatient = async (req, res) => {
  const { email, fullname, address, dob, height, weight, gender, contact } =
    req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    let user = await Patient.addPatient(
      fullname,
      email,
      new Date(dob),
      weight,
      height,
      gender,
      contact,
      address,
      _id
    );

    res.status(201).json({ email, user });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

module.exports = {
  addPatient,
};
