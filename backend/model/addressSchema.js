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
});

module.export = addressSchema;
