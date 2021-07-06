const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  Fname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 15,
  },
  Lname: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  Cin: {
    type: String,
    required: true,
    trim: true,
    maxlength: 12,
  },

  Tel: {
    type: String,
    required: false,
  },

  Price: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 5,
  },
  Categorie: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2,
  },
  Extension: {
    type: Boolean,
    default: false,
  },

  Adresse: {
    type: String,
    maxlength: 50,
  },

  Referent: {
    type: String,
    maxlength: 12,
  },
  Avances: [
    {
      Montant: Number,
      dateAvance: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  autoEcole: {
    type: String,
    required: true,
  },
  dateEntree: {
    type: Date,
    default: Date.now,
  },
});

module.exports = candidateModel = mongoose.model("candidate", candidateSchema);
