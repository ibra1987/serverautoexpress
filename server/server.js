const express = require("express");
const candidatesRoutes = require("./routes/candidatesRoutes");
const chargesRoutes = require("./routes/chargesRoutes");
const vehiculesRoutes = require("./routes/vehiculesRoutes");
const echeancesRoutes = require("./routes/echeancesRoutes");
const autoEcolesRoutes = require("./routes/autoEcolesRoutes");
const personnelRoutes = require("./routes/personnelRoutes");

const dotenv = require("dotenv");
const connection = require("./config/db");
const cors = require("cors");
dotenv.config();

//init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(` server started @ ${port}`));
//connect to db

connection();
// routes
app.use("/candidates", candidatesRoutes);
app.use("/charges", chargesRoutes);
app.use("/vehicules", vehiculesRoutes);
app.use("/echeances", echeancesRoutes);
app.use("/autoecoles", autoEcolesRoutes);
app.use("/personnel", personnelRoutes);
