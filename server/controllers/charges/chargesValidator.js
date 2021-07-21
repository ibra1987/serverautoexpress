const { check } = require("express-validator");

exports.chargesValidator = [
  check("Libelle", "Merci de remplir le champs Libelle").not().isEmpty(),
  check("autoEcole", "Merci de remplir le champs auto ecole").not().isEmpty(),
  check("Montant", "Le prix doit etre un chiffre").not().isEmpty().isInt(),
];
