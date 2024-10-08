const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const register = (req, res) => {
  const { userName, email, password, phoneNumber } = req.body;
  const user = new userModel({
    userName,
    email,
    password,
    phoneNumber,
    role: "6702e78491ebbce271d05d93",
  });

  user
    .save()
    .then((response) => {
      res.status(201).json({
        meassage: "User Created Successfully",
        UserInfo: response,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
const Login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  userModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!res) {
        return res.status(403).json({
          message: `The email or the password is inncorrect`,
        });
      }
      const hashedPassword = result.password;

      try {
        const isSamePassword = await bcrypt.compare(password, hashedPassword);

        if (!isSamePassword) {
          return res.status(403).json({
            message: `The password is inncorrect`,
          });
        }
        const payload = {
          userId: result._id,
          user: result.userName,
          role: result.role,
        };

        const options = {
          expiresIn: "60m",
        };

        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          user: result,
          message: `LogIn Successfully`,
          token: token,
        });
      } catch (error) {}
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
module.exports = { register, Login };
