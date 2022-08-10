const userModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
require("dotenv").config;

exports.createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  if (req.body.Password !== req.body.Password2)
    res.status(400).json({ error: "les mots de pass ne sont pas identiques" });

  const exists = await userModel.findOne({ Name: req.body.Name });

  if (exists) res.status(400).json({ error: " ce nom existe deja" });

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.Password, salt);

  const newUser = {
    Name: req.body.Name,
    Email: req.body.Email,
    Password: hashedPass,
  };

  const newRegistred = new userModel(newUser);

  try {
    const user = await newRegistred.save();

    await res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.login = async (req, res) => {
  const user = await userModel.findOne({ Name: req.body.Name });

  if (!user)
    return res.status(400).json({
      error: " Merci de verifier votre ID utilisateur/votre mot de pass",
    });

  if (!(await bcrypt.compare(req.body.Password, user.Password)))
    return res.status(400).json({
      error: " Merci de verifier votre ID utilisateur/votre mot de pass 2",
    });

  //   const { Password, ...infos } = user.toJSON();

  const token = jwt.sign({ _id: user._id }, process.env.MYSECRET);
  //   return res.status(200).json(infos);

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 1000 * 60,
  });

  res.status(200).json({ message: "succes" });
};

//getuser
exports.getUser = async (req, res) => {
  const jwtCookie = req.cookies.jwt;
  if (!jwtCookie)
    return res.status(400).json({ error: "Merci de vous identifier" });

  const { _id } = jwt.verify(jwtCookie, process.env.MYSECRET);

  const user = await User.findOne({ _id });
  if (!user) return res.status(400).json({ error: "Merci de vous identifier" });
  const token = jwt.sign({ _id: user._id }, process.env.MYSECRET);
  //   return res.status(200).json(infos);

  res
    .cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60,
    })
    .status(200)
    .json({ message: "authorized", user: user.Name });
};
