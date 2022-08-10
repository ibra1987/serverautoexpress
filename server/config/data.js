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
      return res.status(200).json({ data: models, message: "success" });
    }

    return res.status(400).json({ msg: error.message });
  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }
};

// read single record
exports.readOneRecord = async (req, res, model) => {
  try {
    const record = await model.findById(req.params.id);

    if (record) return res.status(200).json(record);

    return res.status(404).json({ error: error.message });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

//update a record
exports.updateRecord = async (req, res, model) => {
  try {
    const { id } = req.params;

    const obj = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ msg: "pas d'enregistrement" });

    const updated = await model.findByIdAndUpdate(id.trim(), obj, {
      new: true,
    });

    return res.json(updated);
  } catch (error) {
    res.status(res.response.status).json({ error: error });
  }
};

//delete a record

exports.deleteRecord = async (req, res, model) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: "pas d'enregistrement" });

  try {
    const deleted = await model.findByIdAndDelete(id.trim());

    return res.status(200).json(deleted);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
