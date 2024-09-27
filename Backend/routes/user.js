const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const userRouter = Router();
require("dotenv").config;
const { userMiddleware } = require("../Middleware/user");

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    // using async await for positive confirmation
    await userModel.create({
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

userRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER_PASSWORD
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

userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.body.userId;

  const purchases = await purchaseModel.find({
    userId,
  });
  res.json({
    purchases,
  });
});

module.exports = {
  userRouter: userRouter,
};
