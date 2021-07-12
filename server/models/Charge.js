const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const chargeSchema = new Schema({
  Libelle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
  },
  Montant: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  dateCharge: {
    Day: {
      type: String,
    },
    Month: {
      type: String,
    },
    Year: {
      type: String,
    },
  },
});

module.exports = chargeModel = mongoose.model("charge", chargeSchema);
