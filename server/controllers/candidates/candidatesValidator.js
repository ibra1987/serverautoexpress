const { check } = require("express-validator");

exports.candidatesValidator = [
  check("Fname", "Merci de remplir le chams prenom").not().isEmpty(),
  check("Lname", "Merci de remplir le champs nom").not().isEmpty(),
  check("Categorie", "Merci de remplir le champs catégorie").not().isEmpty(),
  check("Price", "Le prix doit etre un chiffre").not().isEmpty().isInt(),
  check("Cin", "Merci de remplir le champs Cin").not().isEmpty(),
  check("autoEcole", "Merci de choisir l'auto ecole").not().isEmpty(),
];
