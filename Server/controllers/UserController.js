const Users = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const userCtrl = {
  // add a user account
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        phoneNumber,
        imageUrl,
        location,
        lat,
        lng,
      } = req.body;
      // check if the email is exist or not
      const user = await Users.findOne({ email });
      if (user) {
        return res.send({ err: "sorry this email already exists" });
      }
      const serviceProvider = await ServiceProvider.findOne({ email });
      if (serviceProvider) {
        return res.send({ err: "sorry this email already exists" });
      }
      // hash the password and save the account information
      const hashPassword = await bcrypt.hash(password.toString(), 10);
      const newUser = new Users({
        firstName,
        lastName,
        userName,
        phoneNumber,
        email,
        password: hashPassword,
        imageUrl,
        location,
        lat,
        lng,
      });
      // generate a token for the user
      const token = jwt.sign({ id: newUser._id }, config.toString(), {
        expiresIn: 86400, // expires in 24 hours
      });
      await newUser.save();

      res.send({
        auth: true,
        token: token,
        success: "successfully registred",
        id: newUser._id,
        name: newUser.userName,
        greet: "Welcome",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.msg });
    }
  },
  // find all users that have an account
  getAll: async (req, res) => {
    try {
      const users = await Users.find({});
      res.send(users);
    } catch (error) {
      console.log(error);
    }
  },
  // login with an existing account
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // check if the user already exist or not
      let user = await Users.findOne({ email });
      if (!user) {
        return res.send({ err: "User Not exist" });
      }
      // compare the typed password with password saved for the user
      const isMatch = await bcrypt.compare(password.toString(), user.password);
      if (!isMatch) {
        return res.send({ err: "Incorrect password" });
      }
      // generate a token for the user
      const token = jwt.sign({ id: user._id }, config.secret.toString(), {
        expiresIn: 86400, // expires in 24 hours
      });
      await user.save();

      res.status(200).send({
        auth: true,
        token: token,
        success: "you are logged in successfully",
        id: user._id,
        name: user.userName,
        greet: "Welcome",
        isBanned: user.isBanned,
        lat: user.lat,
        lng: user.lng,
      });
    } catch (error) {
      console.log(error);
    }
  },
  // verify the user with user's token
  verify: async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.send({ auth: false, err: "No token provided" });
    }
    jwt.verify(token, config.secret.toString(), function (error, decoded) {
      if (error)
        return res.send({ auth: false, err: "Failed to authenticate token." });
      Users.findById(
        decoded.id,
        { password: 0 }, // projection to not get back the password
        function (error, user) {
          if (error) {
            return res.send({ err: "There was a problem finding the user." });
          }
          if (!user) {
            return res.send({ err: "No user found." });
          }

          res.status(200).send(user);
        }
      );
    });
  },
  logout: async (req, res) => {
    res
      .status(200)
      .send({ auth: false, token: null, success: "you are logged out" });
  },
  getUserDataById: async (req, res) => {
    try {
      var data = await Users.findOne({ _id: req.params.id });
      res.send(data);
    } catch (err) {
      console.log("err", err);
    }
  },
  update: async (req, res) => {
    try {
      const { firstName, lastName, userName, phoneNumber, location } = req.body;

      let sv = await Users.findByIdAndUpdate(
        { _id: req.params.id },
        {
          firstName,
          lastName,
          userName,
          phoneNumber,
          location,
        },
        { new: true }
      );
      res.send({ success: "updated successfully", data: sv });
    } catch (error) {
      console.log(error);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      if (currentPassword === newPassword) {
        res.send({
          err: "you changed your password to the same password! are you dumb?",
        });
      }
      const userPassword = await Users.findOne({ _id: req.params.id });

      const isMatch = await bcrypt.compare(
        currentPassword.toString(),
        userPassword.password
      );
      if (!isMatch) {
        res.send({ err: "incorrect password" });
      }
      const hashNewPassword = await bcrypt.hash(newPassword.toString(), 10);
      // const hashConfirmPassword = await bcrypt.hash(confirmPassword.toString(), 10);
      // console.log('hashed confirmpassword', hashConfirmPassword)
      const isSame = await bcrypt.compare(
        confirmPassword.toString(),
        hashNewPassword
      );
      if (!isSame) {
        res.send({ err: "make sure to enter your confirm password correctly" });
      }
      if (isMatch && isSame) {
        userPassword.password = hashNewPassword;

        userPassword.save();
        res.send({
          success: "your password changed successfully",
          data: userPassword.password,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateUserImage: async (req, res) => {
    try {
      const { imageUrl } = req.body;
      let user = await Users.findByIdAndUpdate(
        { _id: req.params.id },
        {
          imageUrl,
        },
        { new: true }
      );
      res.send({ success: "updated image successfully", data: user.imageUrl });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userCtrl;
