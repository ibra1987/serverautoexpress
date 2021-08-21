const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personnelSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  dateEmbauche: {
    type: String,
    required: true,
    default: Date,
  },
  autoEcole: {
    type: String,
    require: true,
  },
  salaire: {
    type: Number,
    require: true,
  },
});

module.exports = personnelModel = mongoose.model("personnel", personnelSchema);
