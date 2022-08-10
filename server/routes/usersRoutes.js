const express = require("express");
const {
  createUser,
  getUser,
  login,
} = require("../controllers/users/usersController");
const { usersValidator } = require("../controllers/users/usersValidator");
const router = express.Router();

//@post create
router.post("/create", usersValidator, createUser);
router.post("/login", usersValidator, login);
router.get("/getuser", getUser);

module.exports = router;
