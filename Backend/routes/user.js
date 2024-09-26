const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

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
  try {
    const user = await userModel.find({
      email: email,
      password: password,
    });
    res.json({
      message: "signin succeeded",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occured during signin",
      error: error.message,
    });
  }
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "purchases endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
