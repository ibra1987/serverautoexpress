const autoEcoleModel = require("../../models/Autoecole.js");
const { createRecord, deleteRecord } = require("../../config/data");
const { validationResult } = require("express-validator");

exports.createAutoEcole = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const newAutoEcole = {
    Name: req.body.Name,
  };

  try {
    await createRecord(req, res, autoEcoleModel, newAutoEcole);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAutoEcoles = async (req, res) => {
  try {
    const autos = await autoEcoleModel.find().exec();
    res.json({ message: "success", data: autos });
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteAutoEcole = async (req, res) => {
  try {
    const response = await deleteRecord(req, res, autoEcoleModel);
  } catch (error) {
    res.status(404).json(error);
  }
};
