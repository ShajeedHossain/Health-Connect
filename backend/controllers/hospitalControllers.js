const Hospital = require("../model/hospitalModel");
const Doctor = require("../model/doctorModel");
const Patient = require("../model/patientModel");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  convertTimeToDateTime,
  convertTimeToHHMM,
  generateStrongPassword,
  sendEmail,
} = require("../utilities/utilities");
const validator = require("validator");
const mongoose = require("mongoose");

const addHospital = async (req, res) => {
  const {
    hospitalName,
    district,
    town,
    // totalBeds,
    // totalCabins,
    // availableBeds,
    // availableCabins,
    cabins,
    beds,
    facilities,
    email,
    password,
    latitude,
    longitude,
  } = req.body;

  const facilitiesList = facilities.split(",");
  console.log(facilitiesList);

  try {
    const hospital = await Hospital.addHospital(
      hospitalName,
      district,
      town,
      //   totalBeds,
      //   totalCabins,
      //   availableBeds,
      //   availableCabins,
      cabins,
      beds,
      facilitiesList,
      email,
      password,
      latitude,
      longitude
    );

    res.status(201).json({ hospital });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const getAllHospital = async (req, res) => {
  try {
    const hospitalList = await Hospital.getAllHospital();

    res.status(200).json({ hospitalList });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createDoctorSignup = async (req, res) => {
  const {
    email,
    fullname,
    dob,
    gender,
    contact,
    education,
    specializations,
    bma_id,
    // district,
    // town,
    // latitude,
    // longitude,
    appointment_fees,
    morning_shift_time,
    evening_shift_time,
    available_days,
  } = req.body;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const specializationsList = specializations.split(",");
  const available_daysList = available_days.split(",");
  console.log(available_daysList);
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const hospital = await Hospital.findById({ _id });

    const doctor = await Doctor.addOneDoctor(
      fullname,
      _id,
      dob,
      education,
      gender,
      contact,
      email,
      specializationsList,
      bma_id,
      hospital.address,
      appointment_fees,
      convertTimeToDateTime(morning_shift_time),
      convertTimeToDateTime(evening_shift_time),
      available_daysList
    );
    console.log(doctor);
    res.status(200).json({ doctor });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const getHospitalDoctors = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.getHospitalDoctors(_id);
    console.log(doctor);
    res.status(200).json({ doctor });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

function processManyDoctorData(
  doctorDataArray,
  hospitalId,
  hospitalName,
  address
) {
  doctorDataArray.forEach((doctor) => {
    //Adding hospitalId, hospitalName and address
    doctor.hospitalId = hospitalId;
    doctor.hospitalName = hospitalName;
    doctor.address = address;

    // Convert contact to string and add a '0' at the beginning
    doctor.contact = "0" + doctor.contact.toString();
    doctor.bma_id = doctor.bma_id.toString();

    // Split available_days and specializations into arrays
    doctor.available_days = doctor.available_days.split(",");
    doctor.specializations = doctor.specializations.split(",");

    // Convert time formats
    console.log(doctor.morning_shift_time);
    console.log(doctor.evening_shift_time);
    if (doctor.morning_shift_time) {
      doctor.morning_shift_time = convertTimeToDateTime(
        convertTimeToHHMM(doctor.morning_shift_time.toString())
      );
    }
    if (doctor.evening_shift_time) {
      doctor.evening_shift_time = convertTimeToDateTime(
        convertTimeToHHMM(doctor.evening_shift_time.toString())
      );
    }
  });

  return doctorDataArray;
}

const addManyDoctor = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  let hospital;

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    hospital = await Hospital.findById({ _id });
  } catch (error) {
    console.log(error.message);
  }

  const doctorDataArray = req.body;
  const processedDoctorArray = processManyDoctorData(
    doctorDataArray,
    new mongoose.Types.ObjectId(hospital._id),
    hospital.hospitalName,
    hospital.address
  );
  console.log("PROCESSED: ", processedDoctorArray);

  const createdDocuments = [];
  const failedEmails = [];

  for (const doctor of processedDoctorArray) {
    if (!doctor.bma_id || !doctor.email || !doctor.fullName) {
      throw Error("Email, bma_id and fullName can't be empty");
    }
    if (!validator.isMobilePhone(doctor.contact, "bn-BD")) {
      throw Error("Invalid phone number");
    }
    if (!validator.isEmail(doctor.email)) {
      throw Error("Email is not valid");
    }

    try {
      const exists = await Doctor.findOne({ email: doctor.email });
      const userExists = await User.findOne({ email: doctor.email });

      if (exists || userExists) {
        throw Error(`Email: ${doctor.email} already in use`);
      }
      const document = new Doctor(doctor);
      const createdDocument = await document.save();
      createdDocuments.push(createdDocument);

      //signing up the newly created doctor
      const password = createdDocument.email + "D*123";

      const user = await User.signupDoctor(
        createdDocument.email,
        password,
        createdDocument.fullName,
        createdDocument.doctorId,
        createdDocument.address
      );
    } catch (error) {
      failedEmails.push(doctor.email);
      console.error(error.message);
    }
  }
  console.log("CREATED: ", createdDocuments);
  console.log("FAILED: ", failedEmails);
  if (!failedEmails || failedEmails.length === 0) {
    res.status(200).json({ createdDocuments });
  } else {
    res.status(400).json({ createdDocuments, failedEmails });
  }
};

const getHospital = async (req, res) => {
  console.log("API CALLED");
  const { authorization } = req.headers;
  let hospital;
  const { hospitalId } = req.body;
  console.log("HOSPITAL ID:", req.body);
  try {
    if (hospitalId) {
      const _id = hospitalId;
      hospital = await Hospital.findById(_id);
    } else {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.JWT_SECRET);
      hospital = await Hospital.findById(_id);
    }

    console.log("GOT HOSPITAL:", hospital);
    res.status(200).json({ hospital });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const createPatientAccount = async (req, res) => {
  const { email, fullname, contact } = req.body;
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isMobilePhone(contact, "bn-BD")) {
    throw Error("Invalid phone number");
  }

  try {
    const exists = await Patient.findOne({ email: email });
    const userExists = await User.findOne({ email: email });
    if (exists || userExists) {
      throw Error("Email is already in use");
    }

    const password = generateStrongPassword(8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      fullname,
      password: hashedPassword,
    });
    console.log("USER ACCOUNT CREATED: ", newUser);

    const newPatient = await Patient.create({
      _id: newUser._id,
      email,
      fullName: fullname,
      contact,
      type: "patient",
    });
    console.log("PATIENT ACCOUNT CREATED: ", newPatient);

    res.status(200).json({ patient: newPatient });
    //SENDING THE EMAIL AND PASSWORD
    const message = `Thank you for using our service. Your credentials for logging in: \n\nEmail: ${email}\nPassword:${password}`;
    sendEmail(email, "Signed up in Health-Connect", message);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateHospital = async (req, res) => {
  const { hospitalName, beds, cabins, email, address, contact } = req.body;
  address.latitude = address.latitude.toString();
  address.longitude = address.longitude.toString();
  console.log(address);

  //   beds.forEach((bed) => {
  //     bed.features = bed.features.split(","); // Split the string into an array
  //   });
  //   cabins.forEach((cabin) => {
  //     cabin.features = cabin.features.split(","); // Split the string into an array
  //   });

  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  console.log("BEDS: ", beds);
  console.log("CABINS: ", cabins);
  console.log("CONTACT: ", contact);

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    const emailExists = await Hospital.findOne({ email: email });
    const prevEmail = await Hospital.findById(_id);
    if (prevEmail.email !== email && emailExists) {
      throw Error("Email already exists");
    }
    if (!validator.isMobilePhone(contact, "bn-BD")) {
      throw Error("Invalid phone number");
    }
    const result = await Hospital.findByIdAndUpdate(_id, {
      $set: {
        hospitalName: hospitalName,
        beds: beds,
        cabins: cabins,
        email: email,
        address: address,
        contact: contact,
      },
    });
    const userUpdate = await User.findByIdAndUpdate(_id, {
      $set: {
        email: email,
      },
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  addHospital,
  getAllHospital,
  createDoctorSignup,
  getHospitalDoctors,
  addManyDoctor,
  getHospital,
  createPatientAccount,
  updateHospital,
};
