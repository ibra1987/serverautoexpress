const personnelModel = require("../../models/Personnel");
const {
  readRecords,
  createRecord,
  readOneRecord,
  deleteRecord,
} = require("../../config/data");
const { validationResult } = require("express-validator");

exports.createPersonnel = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const newPersonnel = {
    Name: req.body.Name,
    dateEmbauche: req.body.dateEmbauche,
    autoEcole: req.body.autoEcole,
    salaire: req.body.salaire,
  };

  try {
    await createRecord(req, res, personnelModel, newPersonnel);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getPersonnel = async (req, res) => {
  try {
    await readRecords(req, res, personnelModel);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deletePersonnel = async (req, res) => {
  try {
    await deleteRecord(req, res, personnelModel);
  } catch (error) {
    res.status(500).json(error);
  }
};
