const express = require("express");
const {
  createAutoEcole,
  deleteAutoEcole,
  getAutoEcoles,
} = require("../controllers/autoecoles/autoEcolesController");
const {
  chargesValidator,
} = require("../controllers/autoecoles/autoEcolesValidator");
const router = express.Router();

//@post create
router.post("/create", autoEcolesValidator, createAutoEcole);

//@delete charge

router.delete("/:id", deleteAutoEcole);

//@get all auto ecoles

router.get("/", getAutoEcoles);

module.exports = router;
