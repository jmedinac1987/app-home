"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monthly_expenses_schema = Schema({
  type: {
    type: String,
    lowercase: true,
    enum: ["existente", "mensual"],
    required: true
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 125,
    lowercase: true,
    required: true
  },
  amount_paid: { type: Number, min: 1, max: 22, required: true },
  payment_date: { type: Date }
});

module.exports = mongoose.model("MonthlyExpenses", monthly_expenses_schema);
