const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const chargeSchema = new Schema({
  Libelle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
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
  autoEcole: {
    type: String,
    required: true,
  },
  candidate: [
    { type: Schema.Types.ObjectId, ref: "candidate", required: false },
  ],
});

module.exports = chargeModel = mongoose.model("charge", chargeSchema);
