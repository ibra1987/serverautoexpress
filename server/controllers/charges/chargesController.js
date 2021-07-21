const chargeModel = require("../../models/Charge");
const { createRecord, deleteRecord } = require("../../config/data");
const { validationResult } = require("express-validator");

exports.createCharge = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const charge = {
    Libelle: req.body.Libelle,
    Montant: req.body.Montant,
    dateCharge: req.body.dateCharge,
    autoEcole: req.body.autoEcole,
  };

  try {
    await createRecord(req, res, chargeModel, charge);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getCharges = async (req, res) => {
  try {
    const response = await chargeModel.find().exec();
    res.json(response);
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteCharge = async (req, res) => {
  try {
    const response = await deleteRecord(req, res, chargeModel);
  } catch (error) {
    res.status(404).json(error);
  }
};
