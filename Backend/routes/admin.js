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
    message: "course created",
    courseId: course._id,
  });
});

adminRouter.put("/", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

adminRouter.get("/bulk", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
