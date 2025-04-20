const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  countryCode: String,
  companyName: String,
  country: String,
  service: String,
  description: String,
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);
