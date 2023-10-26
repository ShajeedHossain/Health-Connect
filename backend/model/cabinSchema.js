const mongoose = require("mongoose");

// Define the Cabin schema
const cabinSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  remaining: {
    type: Number,
    default: function () {
      return this.count;
    },
  },
});

module.exports = cabinSchema;
