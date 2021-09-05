const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },

  Email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
});

module.exports = usereModel = mongoose.model("user", userSchema);
