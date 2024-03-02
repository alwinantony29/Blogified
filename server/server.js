require("dotenv").config();
const cors = require("cors");
const Auth = require("./API/auth");
const Blogs = require("./API/blog");
const Users = require("./API/user");
const express = require("express");
const connectDB = require("./config/mongoose");
const app = express();
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/auth", Auth);
app.use("/blogs", Blogs);
app.use("/users", Users);
app.get("/", (req, res) => {
  res.send("Hello from server");
});
const data = require("./data.json");
const { blogs } = require("./models/blog");

// inserting dummy data
app.get("/insertdata", async (req, res) => {
  try {
    await blogs.insertMany(data.blogs);
    res.json({ message: "data inserted succesfully" });
  } catch (err) {
    res.status(500).send({ message: "kereeela" });
    console.log(err);
  }
});
// connecting to database
connectDB()
  .then(() => {
    console.log("port" + process.env.PORT);
    // Starting the server
    app.listen(process.env.PORT, () => {
      console.log("server started at ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
