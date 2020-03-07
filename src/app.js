"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const apiV1 = require("./routes/ApiV1");

//Middlewares
app.use(cors(config.corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes development
app.get("/", (req, res) => {
  res.send("App funcionando");
});

app.get("/login", (req, res) => {
  res.send("ruta login iniciada...");
});

app.get("/gastos", (req, res) => {
  res.send("Ruta de gastos iniciada");
});

//Rutas API
app.use("/apiv1", apiV1);

module.exports = app;
