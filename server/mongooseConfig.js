const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                //   useFindAndModify: false,
                useUnifiedTopology: true
            }
        );
        if (conn) console.log('database connected');
    } catch (e) {
        console.log(e.message);
    }
}
module.exports = connectDB;