const express = require("express");
const candidatesRoutes = require("./routes/candidatesRoutes");
const chargesRoutes = require("./routes/chargesRoutes");
const vehiculesRoutes = require("./routes/vehiculesRoutes");
const echeancesRoutes = require("./routes/echeancesRoutes");
const autoEcolesRoutes = require("./routes/autoEcolesRoutes");
const personnelRoutes = require("./routes/personnelRoutes");
const usersRoutes = require("./routes/usersRoutes");

const dotenv = require("dotenv");
const connection = require("./config/db");
const cors = require("cors");
dotenv.config();

//init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080"],
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(` server started @ ${port}`));
//connect to db

connection();
// routes
app.use("/api/users", usersRoutes);
app.use("/api/candidates", candidatesRoutes);
app.use("/api/charges", chargesRoutes);
app.use("/api/vehicules", vehiculesRoutes);
app.use("/api/echeances", echeancesRoutes);
app.use("/api/autoecoles", autoEcolesRoutes);
app.use("/api/personnel", personnelRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}
