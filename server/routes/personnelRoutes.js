const express = require("express");
const {
  createPersonnel,
  deletePersonnel,
  getPersonnel,
} = require("../controllers/personnel/personnelController");
const {
  personnelValidator,
} = require("../controllers/personnel/personnelValidator");
const router = express.Router();

//@post create
router.post("/create", personnelValidator, createPersonnel);

//@getall create
router.get("/", personnelValidator, getPersonnel);

//@delete echeance

router.delete("/delete/:id", deletePersonnel);

module.exports = router;
