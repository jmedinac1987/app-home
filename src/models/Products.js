"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products_schema = Schema({
  description: {
    type: String,
    minlength: 3,
    maxlength: 255,
    lowercase: true,
    required: true
  },
  state: {
    type: String,
    lowercase: true,
    enum: ["activo", "inactivo"],
    required: true
  },
  year_product: { type: Number, min: 1, max: 22, required: true },//año del producto 
  item_value: { type: Date }//valor del producto
});

module.exports = mongoose.model("Products", products_schema);
