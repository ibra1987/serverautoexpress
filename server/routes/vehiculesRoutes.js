const express = require("express");
const {
  createVehicule,
  getVehicules,
  removeVehicule,
} = require("../controllers/vehicules/vehiculesController");
const {
  vehiculesValidator,
} = require("../controllers/vehicules/vehiculesValidator");
const router = express.Router();

router.post("/create", vehiculesValidator, createVehicule);
router.get("/", getVehicules);
router.delete("/delete/:id", removeVehicule);

module.exports = router;
