"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO: pendiente la creación del schema para el documento deudas mensuales
const monthly_expenses_schema = Schema({
});

module.exports = mongoose.model("Monthly_Expenses", monthly_expenses_schema);
