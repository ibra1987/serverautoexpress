const express = require("express");
const {
  createCharge,
  getCharges,
  deleteCharge,
} = require("../controllers/charges/chargesController");
const { chargesValidator } = require("../controllers/charges/chargesValidator");
const router = express.Router();

//@post create
router.post("/create", chargesValidator, createCharge);

//@get all charges

router.get("/", getCharges);

//@delete charge

router.delete("/:id", deleteCharge);

module.exports = router;
