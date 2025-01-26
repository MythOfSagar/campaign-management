const { Router } = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userRouter = Router();

userRouter.post("/signUp", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const userByEmail = email && await UserModel.findOne({ email });
    const userByUserName = userName && await UserModel.findOne({ userName });

    if (userByEmail) {
      res.status(409).send({
        error: "Email already exists. Please choose a different Email.",
      });
    } else if (userByUserName) {
      res.status(410).send({
        error: "Username already exists. Please choose a different Username.",
      });
    } else {
      const saltRounds = parseInt(process.env.SaltRounds);
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res.status(500).send({
            error: "Error Occurred, Please try again",
          });
        } else {
          const newUser = new UserModel({ userName, email, password: hash });
          await newUser.save();
          res.status(200).send("Account created successfully");
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});


userRouter.post("/signIn", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const conditions = []
    userName && conditions.push({ userName });
    email && conditions.push({ email });

    const findUser = await UserModel.findOne({
      $or: conditions,
    });
    if (findUser) {
      bcrypt.compare(password, findUser.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { creator: findUser._id },
            process.env.encryption
          );

          res.status(200).send({ "token": token, "userId": findUser._id, userName: findUser.userName });
        } else {
          res.status(401).send({
            error: "Wrong password.",
          });
        }
      });
    } else {
      res.status(402).send({
        error: "Email/UserName not Found.",
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});


userRouter.put("/resetPassword", async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const conditions = []
    userName && conditions.push({ userName });
    email && conditions.push({ email });

    const findUser = await UserModel.findOne({
      $or: conditions,
    });
    if (findUser) {
      const saltRounds = parseInt(process.env.SaltRounds);
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res.status(500).send({
            error: "Error Occurred, Please try again",
          });
        } else {

          const id = findUser._id.toString();
          findUser.password=hash

          await UserModel.findByIdAndUpdate(id, findUser);
          res.status(200).send("Password Reseted Successfully.");
        }
      });

    } else {
      res.status(402).send({
        error: "Email/UserName not Found.",
      });
    }
  } catch (err) {
    res.status(500).send({
      error: "Error Occurred, Please try again",
    });
  }
});

module.exports = { userRouter };
