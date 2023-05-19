const mongoose = require("mongoose");
const uri = 'mongodb+srv://Atlas1234:Atlas123@cluster0.ysimyt6.mongodb.net/?retryWrites=true&w=majority'
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