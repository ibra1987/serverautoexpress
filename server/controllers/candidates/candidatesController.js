const candidateModel = require("../../models/Candidate");
const chargeModel = require("../../models/Charge");
const {
  readRecords,
  readOneRecord,
  deleteRecord,
} = require("../../config/data");
const { validationResult } = require("express-validator");

exports.createCandidate = async (req, res) => {
  req.body.Avances = parseInt(req.body.Avances);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const candidate = {
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    Cin: req.body.Cin,
    Adresse: req.body.Adresse,
    Categorie: req.body.Categorie,
    Price: req.body.Price,
    Extension: req.body.Extension,
    Tel: req.body.Tel,
    Referent: req.body.Referent,
    autoEcole: req.body.autoEcole,
  };

  if (req.body.Avances) {
    candidate.Avances = parseInt(req.body.Avances);
  }
  const currentDate = new Date();

  let charge;

  if (candidate.Extension) {
    charge = 650;
  } else {
    charge = 700;
  }

  let jour = currentDate.getDate();
  let mois = currentDate.getMonth() + 1;
  if (currentDate.getDate() < 10) {
    jour = `0${currentDate.getDate()}`;
  }
  if (currentDate.getMonth() < 10) {
    mois = `0${currentDate.getMonth() + 1}`;
  }

  try {
    const newCandidate = new candidateModel(candidate);
    await newCandidate.save();
    const fraisDossier = {
      Libelle: `frais dossier: ${newCandidate.Fname} ${newCandidate.Lname}`,
      Montant: charge,
      dateCharge: {
        Day: jour,
        Month: mois,
        Year: currentDate.getFullYear(),
      },
      autoEcole: candidate.autoEcole || "Akka",
      candidate: newCandidate._id,
    };

    const newCharge = new chargeModel(fraisDossier);
    newCharge.save();
    res.status(201).json(newCandidate);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.readCandidates = async (req, res) => {
  try {
    await readRecords(req, res, candidateModel);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.readOneCandidate = async (req, res) => {
  try {
    await readOneRecord(req, res, candidateModel);
  } catch (error) {
    console.log(error);
  }
};

exports.updateCandidate = async (req, res) => {
  const {
    Fname,
    Lname,
    Cin,
    Adresse,
    Categorie,
    Price,
    Extension,
    Tel,
    Referent,
    autoEcole,
  } = req.body;

  const id = req.params.id;

  try {
    const upd = await candidateModel.findById({ _id: id });
    if (upd) {
      const newUpd = {
        Fname,
        Lname,
        Adresse,
        Categorie,
        Price,
        Extension,
        Cin,
        Tel,
        Referent,
        autoEcole,
      };

      const updated = await candidateModel.findByIdAndUpdate(
        { _id: id },
        newUpd,
        {
          new: true,
        }
      );
      res.json(updated);
    }
  } catch (error) {
    res.json(error);
  }
};

exports.addNewAvance = async (req, res) => {
  const id = req.body.id;
  const avance = req.body.newAvance;
  try {
    const candidate = await candidateModel.findById(id);
    await candidate.Avances.push({
      Montant: avance,
    });
    await candidate.save();
    lastOne = candidate.Avances.slice(-1)[0];
    res.status(201).json(lastOne);
  } catch (error) {
    res.json(error);
  }
};

exports.deleteAvance = async (req, res) => {
  const { cid, avid } = req.params;

  try {
    const candidate = await candidateModel.findByIdAndUpdate(
      cid,
      {
        $pull: { Avances: { _id: avid } },
      },
      { safe: true, upsert: true },

      function (err, candidate) {
        if (err) {
          return handleError(res, err);
        }
        return res.status(204).json(candidate.Avances);
      }
    );
  } catch (error) {
    res.status(404).json(error);
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    await deleteRecord(req, res, candidateModel);
  } catch (error) {
    res.status(404).json(error);
  }
};
