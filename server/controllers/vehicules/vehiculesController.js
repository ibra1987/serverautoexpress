const vehiculeModel = require("../../models/Vehicule");
const {
  createRecord,
  deleteRecord,
  readRecords,
} = require("../../config/data");
const { validationResult } = require("express-validator");

exports.createVehicule = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const newVehicule = {
    Immat: req.body.Immat,
    dateAssur: req.body.dateAssur,
    dateVisite: req.body.dateVisite,
  };
  const response = await createRecord(req, res, vehiculeModel, newVehicule);
  res.status(201).json(response);
};

exports.getVehicules = async (req, res) => {
  try {
    const response = await vehiculeModel.find();

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.removeVehicule = async (req, res) => {
  await deleteRecord(req, res, vehiculeModel);
};
