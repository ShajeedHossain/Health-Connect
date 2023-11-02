const jwt = require("jsonwebtoken");
const Patient = require("../model/patientModel");
const Doctor = require("../model/doctorModel");
const fetchs = require("node-fetch");
const {
  generateSerial,
  generatePatientCount,
} = require("../utilities/utilities");
// const { formatDate } = require("../utilities/utilities.js");

const updatePatient = async (req, res) => {
  const {
    email,
    fullname,
    dob,
    height,
    weight,
    gender,
    contact,
    district,
    town,
    latitude,
    longitude,
  } = req.body;
  const address = {
    district,
    town,
    latitude,
    longitude,
  };
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    let user = await Patient.updatePatient(
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

    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const doctorList = await Doctor.getAllDoctor();
    console.log(doctorList);

    res.status(200).json({ doctorList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getSortedDoctorList = async (req, res) => {
  try {
    const doctorList = await Doctor.getAllDoctor();

    for (const doctor of doctorList) {
      const patientCount = await generatePatientCount(doctor._id); // May need to use generate serial for specific date
      doctor.patientCount = patientCount;
      Object.assign(doctor, { patientCount: patientCount });
      console.log("DOCTOR", doctor);
    }

    doctorList.sort((a, b) => b.patientCount - a.patientCount); //reverse to get ascending sort

    res.status(200).json({ doctorList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getPatient = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const patient = await Patient.findById({ _id });
    console.log(patient);

    res.status(200).json({ patient });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const receiveMapUrl = async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetchs(url);
    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

async function calculateDistances(doctorList, userLatitude, userLongitude) {
  const apiKey = "AIzaSyCw9Xz5vT5x6m8DTutXNygenRnDX8jIYXs"; // Replace with your API key

  try {
    // const doctorList = await Doctor.getAllDoctor();
    const destinations = doctorList
      .map((coord) => `${coord.address.latitude},${coord.address.longitude}`)
      .join("|");

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLatitude},${userLongitude}&destinations=${destinations}&key=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    //adding the distance in the doctorList as property
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows[0].elements.length; i++) {
        const element = data.rows[0].elements[i];
        if (element.distance) {
          doctorList[i].distance = element.distance.text.split(" ")[0];
        } else {
          doctorList[i].distance = "Distance not available";
        }
      }
      // Sort the doctorList by distance in ascending order
      doctorList.sort((a, b) => {
        // Parse the distance text to compare numeric values
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);

        // If both distances are valid numbers, compare them
        if (!isNaN(distanceA) && !isNaN(distanceB)) {
          return distanceA - distanceB;
        }

        // If one or both distances are not valid, move them to the end
        if (isNaN(distanceA) && isNaN(distanceB)) {
          return 0; // Preserve the order
        } else if (isNaN(distanceA)) {
          return 1; // Move a to the end
        } else {
          return -1; // Move b to the end
        }
      });
      return doctorList;
    } else {
      console.log("No distance data available.");
    }

    // console.log(coordinatesArray);
  } catch (error) {
    console.error("Error:", error);
  }
}

const getSortedDoctorData = async (req, res) => {
  const { specializationFilter, districtFilter, sortByDistance } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const query = {};

  // Check if district is provided and add it to the query
  if (districtFilter) {
    query["address.district"] = districtFilter;
  }

  // Check if a single specialization is provided and add it to the query
  if (specializationFilter) {
    query.specializations = specializationFilter;
  }
  try {
    const doctorData = await Doctor.find(query).lean();
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const patient = await Patient.findById({ _id });
    if (parseInt(sortByDistance)) {
      const doctorList = await calculateDistances(
        doctorData,
        patient.address.latitude,
        patient.address.longitude
      );
      //   console.log(doctorList);
      res.status(200).json({ doctorList }); //sorting on distance
      return;
    }

    res.status(200).json({ doctorData }); //without sorting on distance
    return;
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  updatePatient,
  getAllDoctor,
  getSortedDoctorList,
  getPatient,
  receiveMapUrl,
  getSortedDoctorData,
};
