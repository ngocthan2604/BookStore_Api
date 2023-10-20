const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

module.exports = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};
