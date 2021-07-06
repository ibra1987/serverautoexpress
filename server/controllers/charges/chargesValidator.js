const { check } = require("express-validator");

exports.chargesValidator = [
  check("Libelle", "Merci de remplir le chams Libelle").not().isEmpty(),
  check("Montant", "Le prix doit etre un chiffre").not().isEmpty().isInt(),
];
