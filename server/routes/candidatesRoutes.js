const express = require("express");
const {
  createCandidate,
  deleteCandidate,
  readCandidates,
  readOneCandidate,
  deleteAvance,
  updateCandidate,
  addNewAvance,
} = require("../controllers/candidates/candidatesController");
const {
  candidatesValidator,
} = require("../controllers/candidates/candidatesValidator");
const router = express.Router();

//@post create
router.post("/create", candidatesValidator, createCandidate);

//@patch update a record
router.post("/update/:id", candidatesValidator, updateCandidate);

//@post new avanc e

router.post("/avances", addNewAvance);

//@delete avance

router.delete("/avance/delete/:cid/:avid", deleteAvance);

//@get read all
router.get("/", readCandidates);

//@get single Candidate

//@get read single
router.get("/single/:id", readOneCandidate);

//@delete read single
router.delete("/delete/:id", deleteCandidate);

module.exports = router;
