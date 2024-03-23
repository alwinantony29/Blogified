require("dotenv").config();
const cors = require("cors");
const Auth = require("./API/auth");
const Blogs = require("./API/blog");
const Users = require("./API/user");
const express = require("express");
const connectDB = require("./config/mongoose");
const morgan = require('morgan');

const app = express();
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ origin: "https://blogified.vercel.app" }));
app.use(express.json());
app.use(morgan('dev'));

app.use("/auth", Auth);
app.use("/blogs", Blogs);
app.use("/users", Users);

app.get("/", (_, res) => res.send("Hello from server"));
const data = require("./data.json");
const { blogs } = require("./models/blog");

// inserting dummy data
app.get("/insert-data", async (req, res) => {
  try {
    await blogs.insertMany(data.blogs);
    res.json({ message: "data inserted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Dummy data insertion failed " });
    console.error(err);
  }
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(
        `🚀 Server started at http://localhost:${process.env.PORT || 3001}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
