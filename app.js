require("dotenv").config();
const express = require("express");

const app = express();
const port = 5100;
const cors = require("cors");
app.use(cors());
//db connection
const dbConnection = require("./db/dbConfig");
//user routes middleware file
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const authMiddleware = require("./middleware/authMiddleware");

//json middleware to extract json data
app.use(express.json());
//user routes middleware
app.use("/api/users", userRoutes);
//question routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);
//answer middleware

async function start() {
  try {
    const result = await dbConnection.execute("select 'test' ");
    app.listen(port);
    console.log("Datbase connection estabilshed");
    console.log(`listening on ${port}`);
  } catch (err) {
    console.log(err.message);
  }
}
start();
// app.listen(port, (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(`listening on ${port}`);
//   }
// });
