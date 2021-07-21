const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const autoEcoleSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
module.exports = autoEcoleModel = mongoose.model("autoecole", autoecoleSchema);
