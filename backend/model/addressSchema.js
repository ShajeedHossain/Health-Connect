const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  district: {
    type: String,
    required: true,
  },
  town: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    default: null,
  },
  longitude: {
    type: String,
    default: null,
  },
});

module.export = addressSchema;
