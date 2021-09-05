const { check } = require("express-validator");

exports.usersValidator = [
  check("Name", "Merci de remplir le champs Nom").not().isEmpty(),
  check("Password", "Merci de remplir le  champs mot de pass").not().isEmpty(),
  check("Password2", "Merci de confirmer le mot de pass").not().isEmpty(),
  check("Email", "Merci de verifier l'email").not().isEmpty().isEmail(),
];
