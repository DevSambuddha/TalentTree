const { Router } = require("express");
const adminRouter = Router();
const jwt = require("jsonwebtoken");
const { adminModel } = require("../db");
require("dotenv").config;

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

adminRouter.post("/", function (req, res) {
  res.json({
    message: "signup endpoint",
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
