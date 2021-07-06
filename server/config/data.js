const mongoose = require("mongoose");

// create new record
exports.createRecord = async (req, res, model, object) => {
  const newModel = new model(object);
  try {
    await newModel.save();
    res.status(201).json(newModel);
  } catch (error) {
    res.status(400).json({ Error: error });
  }
};

// read all records
exports.readRecords = async (req, res, model) => {
  const resultsPerPage = 2;
  try {
    const models = await model.find().sort({ dateEntree: "desc" });
    /*.limit(resultsPerPage)
      .skip((p - 1) * resultsPerPage);*/

    if (models) {
      return res.status(200).json(models);
    }

    return res.status(400).json({ msg: "pas d'enregistrements" });
  } catch (error) {
    return res.status(500).json({ Error: "Server error" });
  }
};

// read single record
exports.readOneRecord = async (req, res, model) => {
  try {
    const record = await model.findById(req.params.id);

    if (record) return res.status(200).json(record);

    return res.status(404).json({ msg: "pas d'enregistrement" });
  } catch (error) {
    return res.status(404).json({ msg: "pas d'enregistrement" });
  }
};

//update a record
exports.updateRecord = async (req, res, model) => {
  const { id } = req.params;

  const obj = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: "pas d'enregistrement" });

  const updated = await model.findByIdAndUpdate(id.trim(), obj, { new: true });

  return res.json(updated);
};

//delete a record

exports.deleteRecord = async (req, res, model) => {
  const { id } = req.params;

  const deleted = await model.findByIdAndDelete(id);

  return res.status(200).json(deleted);
};
