const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      //   useFindAndModify: false,
      useUnifiedTopology: true,
    });
    if (!conn) throw "Something went wrong while connecting with the database";
  } catch (error) {
    throw `Database connection failed: ${error.message}`;
  }
};
module.exports = connectDB;
