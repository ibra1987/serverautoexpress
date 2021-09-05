const express = require("express");
const { createUser, getUser } = require("../controllers/users/usersController");
const { usersValidator } = require("../controllers/users/usersValidator");
const router = express.Router();

//@post create
router.post("/create", usersValidator, createUser);
router.post("/login", usersValidator, getUser);

module.exports = router;
