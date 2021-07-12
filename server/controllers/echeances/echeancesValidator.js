const { check } = require("express-validator");

exports.echeancesValidator = [
  check("Libelle", "Merci de remplir le champs Libelle").not().isEmpty(),
  check("jourEcheance", "Merci de remplir le  champs date echeance")
    .not()
    .isEmpty(),
];
