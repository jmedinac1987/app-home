"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const client_schema = Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 125,
    lowercase: true,
    required: true
  },
  last_name: {
    type: String,
    minlength: 3,
    maxlength: 125,
    lowercase: true,
    required: true
  },
  address: { type: String, minlength: 3, maxlength: 125, lowercase: true },
  phone: { type: String, minlength: 8, required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date }
});

module.exports = mongoose.model("Client", client_schema);
