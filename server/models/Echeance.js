const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const echeanceSchema = new Schema({
  Libelle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
  },

  jourEcheance: {
    type: Number,
    required: true,
    length: 2,
  },
  autoEcole: {
    type: String,
    require: true,
  },
});

module.exports = echeanceModel = mongoose.model("echeance", echeanceSchema);
