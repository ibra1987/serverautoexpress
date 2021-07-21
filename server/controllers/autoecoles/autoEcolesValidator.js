const { check } = require("express-validator");

exports.autoEcolesValidator = [
  check("Name", "Merci de renseigner le nom du nouveau etablissement")
    .not()
    .isEmpty(),
];
