"use strict";
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const config = require("./config");
const morgan = require("morgan");

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
//app.use('/api', api);

module.exports = app;
