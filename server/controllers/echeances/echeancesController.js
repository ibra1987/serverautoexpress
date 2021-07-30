const echeanceModel = require("../../models/Echeance");
const {
  readRecords,
  createRecord,
  readOneRecord,
  deleteRecord,
} = require("../../config/data");
const { validationResult } = require("express-validator");

exports.createEcheance = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const newEcheance = {
    Libelle: req.body.Libelle,
    jourEcheance: req.body.jourEcheance,
    autoEcole: req.body.autoEcole,
  };

  try {
    await createRecord(req, res, echeanceModel, newEcheance);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getEcheances = async (req, res) => {
  try {
    await readRecords(req, res, echeanceModel);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteEcheance = async (req, res) => {
  try {
    await deleteRecord(req, res, echeanceModel);
  } catch (error) {
    res.status(500).json(error);
  }
};
