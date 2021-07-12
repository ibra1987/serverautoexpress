const express = require("express");
const {
  createEcheance,
  deleteEcheance,
  getEcheances,
} = require("../controllers/echeances/echeancesController");
const {
  echeancesValidator,
} = require("../controllers/echeances/echeancesValidator");
const router = express.Router();

//@post create
router.post("/create", echeancesValidator, createEcheance);

//@getall create
router.get("/", echeancesValidator, getEcheances);

//@delete echeance

router.delete("/delete/:id", deleteEcheance);

module.exports = router;
