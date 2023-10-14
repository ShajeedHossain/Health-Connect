const Hospital = require("../model/hospitalModel");

const addHospital = async (req, res) => {
  const {
    hospitalName,
    district,
    town,
    totalBeds,
    totalCabins,
    availableBeds,
    availableCabins,
    email,
    password,
  } = req.body;

  try {
    const hospital = await Hospital.addHospital(
      hospitalName,
      district,
      town,
      totalBeds,
      totalCabins,
      availableBeds,
      availableCabins,
      email,
      password
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

module.exports = {
  addHospital,
  getAllHospital,
};
