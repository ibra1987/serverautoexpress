const { check } = require("express-validator");

exports.echeancesValidator = [
  check("Libelle", "Merci de remplir le champs Libelle").not().isEmpty(),
  check("jourEcheance", "Merci de remplir le  champs date echeance")
    .not()
    .isEmpty(),
  check("autoEcole", "Merci de remplir le  champs auto ecole").not().isEmpty(),
];
