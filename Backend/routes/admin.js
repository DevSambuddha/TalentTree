const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel, courseModel } = require("../db");
require("dotenv").config;
const { adminMiddleware } = require("../Middleware/admin");

adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    // using async await for positive confirmation
    await adminModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "signup succeeded",
    });
  } catch (error) {
    console.error("Error occurred:", error.message);

    // Send an error response if the signup process fails
    res.status(500).json({
      message: "Error occurred during signup",
      error: error.message,
    });
  }
});

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });
  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_ADMIN_PASSWORD
    );
    //Do cookie logic here
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;
  //creating web3 saas video(imp watch for image uploading)
  const course = await courseModel.create({
    title,
    description,
    imageUrl,
    price,
    creatorId: adminId,
  });
  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await courseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title,
      description,
      imageUrl,
      price,
    }
  );
  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const course = await courseModel.find({
    creatorId: adminId,
  });
  res.json({
    message: "Courses",
    courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
