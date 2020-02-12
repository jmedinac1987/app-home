"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const debst_schema = Schema({
  title: {
    type: String,
    minlength: 3,
    maxlength: 125,
    lowercase: true,
    required: true
  },
  state: {
    type: String,
    lowercase: true,
    enum: ["activa", "pagada"],
    required: true
  },
  debt_amount: { type: Number, min: 1, max: 22, required: true },
  paid_value: { type: Number, min: 1, max: 22, required: true },
  outstanding_value: { type: Number, min: 1, max: 22, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date }
});

module.exports = mongoose.model("Debst", debst_schema);
