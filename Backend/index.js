const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

const port = process.env.PORT || 3000;

async function main() {
  await mongoose.connect(process.env.DB_PASSWORD);
  app.listen(port);
  console.log("listening on port 3000");
}

main();
