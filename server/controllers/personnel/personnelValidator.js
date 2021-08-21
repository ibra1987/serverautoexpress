const { check } = require("express-validator");

exports.personnelValidator = [
  check("Name", "Merci de remplir le champs Nom").not().isEmpty(),
  check("dateEmbauche", "Merci de remplir le  champs date echeance")
    .not()
    .isEmpty(),
  check("autoEcole", "Merci de remplir le  champs auto ecole").not().isEmpty(),
];
