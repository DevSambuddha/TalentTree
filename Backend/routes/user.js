const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  //const email =req.body.email;(we used to do like this)
  try {
    await userModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastname: lastName,
    });
  } catch (error) {
    console.error("Error occured:", error.message);
  }
  res.json({
    message: "signup succeded",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});

module.exports = {
  userRouter: userRouter,
};
