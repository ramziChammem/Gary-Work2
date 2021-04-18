const Login = require("../models/AdminCred");
const bcrypt = require("bcrypt");
const Users = require("../models/User");
const ServiceProvider = require("../models/ServiceProvider.js");
const twilio = require("twilio");

const client = new twilio(
  "AC265a6bb67a6ac795d9909c2a7d415e90",
  "512f56e02aa5bd087f8d2295ffe0b597"
);

const admin = {
  post: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPass = await bcrypt.hash(password.toString(), 10);
      const newAdmin = new Login({
        email,
        password: hashedPass,
      });
      await newAdmin.save();
      res.send({ success: "ok" });
    } catch (err) {
      console.log(err);
    }
  },

  verifyLogin: async (req, res) => {
    try {
      let { email, password } = req.body;

      const admin = await Login.findOne({
        email,
      });
      if (!admin) {
        res.send({ err: "cannot find admin" });
      }
      const isMatched = await bcrypt.compare(
        password.toString(),
        admin.password
      );

      console.log(admin);
      if (!isMatched) {
        res.send({ err: "incorrect password" });
      }
      res.send({ msg: "connected", email: email, password: password });
    } catch (err) {
      console.log(err);
    }
  },

  banUser: async (req, res) => {
    try {
      await Users.findByIdAndUpdate({ _id: req.params.id }, { isBanned: true });
      res.json({ ok: "User Banned" });
    } catch (err) {
      res.send(err);
    }
  },

  banSp: async (req, res) => {
    try {
      let ali = await ServiceProvider.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isBanned: true }
      );
      res.json({ ok: "Sp Banned!", ali: ali });
    } catch (err) {
      console.log(err);
    }
  },

  unbanUser: async (req, res) => {
    try {
      await Users.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isBanned: false }
      );
      res.json({ ok: "User Unbanned!" });
    } catch (err) {
      console.log(err);
    }
  },
  unbanSp: async (req, res) => {
    try {
      await ServiceProvider.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isBanned: false }
      );
      res.json({ ok: "Sp Unbanned!" });
    } catch (err) {
      console.log(err);
    }
  },
  verifyAccount: async (req, res) => {
    try {
      let sp = await ServiceProvider.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isVerified: true }
      );

      await client.messages.create({
        to: `+216${sp.phoneNumber}`,
        from: "+15178363113",
        body: "Your Account Has Been Verified! Welcome To The Community",
      });

      res.json({ ok: "Sp Verified!" });
    } catch (err) {
      console.log(err);
    }
  },

  declineAccount: async (req, res) => {
    try {
      await ServiceProvider.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { isDeclined: true }
      );
      res.json({ ok: "Sp Rejected!" });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = admin;
