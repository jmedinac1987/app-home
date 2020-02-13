"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const user_schema = Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: { type: String, minlength: 3, maxlength: 125, required: true },
  password: { type: String, minlength: 8, required: true, select: false }, //select: false, evitamos que cuando se haga get del usuario la contrasea no sea enviada
  signUpDate: { type: Date, default: Date.now() },
  lastLogin: { type: Date, default: Date.now() }
});

user_schema.pre("save", function(next) {
  let user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", user_schema);
