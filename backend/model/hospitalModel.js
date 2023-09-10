const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  hospitalName: {
    type: String,
    required: true,
  },
  address: addressSchema,
  availableBeds: {
    type: Number,
    default: function () {
      return this.totalBeds || 0; // Default to 0 if totalBeds is not set
    },
  },
  availableCabins: {
    type: Number,
    default: function () {
      return this.totalCabins || 0; // Default to 0 if totalCabins is not set
    },
  },
  totalBeds: {
    type: Number,
    required: true,
  },
  totalCabins: {
    type: Number,
    required: true,
  },
});

// Define a static method to add a hospital
hospitalSchema.statics.addHospital = async function (
  hospitalName,
  district,
  town,
  totalBeds,
  totalCabins,
  availableBeds,
  availableCabins
) {
  const address = {
    district,
    town,
  };
  try {
    if (!hospitalName || !district || !totalBeds || !totalCabins) {
      throw Error("Fields can't be empty");
    }

    // Check if a hospital with the same name and address exists
    const existingHospital = await this.findOne({
      hospitalName,
      address,
    });

    if (existingHospital) {
      throw new Error(
        "Hospital with the same name and address already exists."
      );
    }

    const hospital = await this.create({
      hospitalName,
      address,
      totalBeds,
      totalCabins,
      availableBeds,
      availableCabins,
    });

    return hospital;
  } catch (error) {
    throw error;
  }
};

// Define a static method to get a list of hospitals
hospitalSchema.statics.getAllHospital = async function () {
  try {
    const hospitals = await this.find({});
    return hospitals;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Hospital", hospitalSchema);
