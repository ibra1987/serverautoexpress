const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehiculeSchema = new Schema({
  Immat: {
    type: String,
    required: true,
  },

  dateAssur: {
    type: Date,
    required: true,
  },
  autoEcole: {
    type: String,
    required: true,
  },

  dateVisite: {
    type: Date,
    required: true,
  },
});
module.exports = vehiculeModel = mongoose.model("vehicule", vehiculeSchema);
