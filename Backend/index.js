// const express = require("express");
// //Routing in express , the express
// const app = express();

// app.post("/user/signup", (req, res) => {
//   res.send({
//     message: "signup endpoint",
//   });
// });

// app.post("/user/sigin", (req, res) => {
//   res.send({
//     message: "signup endpoint",
//   });
// });

// app.get("/user/purchase", (req, res) => {
//   res.send({
//     message: "signup endpoint",
//   });
// });

// app.post("/course/purchase", (req, res) => {
//   //you would expect the user to pay you money
//   res.send({
//     message: "signup endpoint",
//   });
// });

// app.get("/course", (req, res) => {
//   res.send({
//     message: "signup endpoint",
//   });
// });

// app.listen(3000):w

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
  await mongoose.connect(process.env.DB_PASSWORD
  );
  app.listen(3000);
  console.log("listening on port 3000");
}

main();
