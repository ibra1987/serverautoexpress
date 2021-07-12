const { check } = require("express-validator");

exports.vehiculesValidator = [
  check("Immat", "Merci de remplir le chams Immatriculation").not().isEmpty(),
  check("dateAssur", "Merci de rensigner la date assurance").not().isEmpty(),
  check("dateVisite", "Merci de rensigner la date de la visite technique").not().isEmpty(),
];
