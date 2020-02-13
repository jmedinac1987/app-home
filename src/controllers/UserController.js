"use strict";

const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const service = require("../services/UserServices");

async function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password,
    lastLogin: Date.now()
  });

  await user.save(err => {
    if (err) return faliedResponse(res, err);

    return successResponse(res, {
      token: service.createToken(user, req.originalUrl)
    });
  });
}

async function signIn(req, res) {
  await User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return notFound(res);

      const password_verification = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (password_verification) {
        changelastLogin(req.body.email);
        successResponse(res, {
          message: "Login correcto",
          token: service.createToken(user, req.originalUrl)
        });
      } else {
        res.status(500).send({ message: "Email o Password incorrectos" });
      }
    })
    .catch(error => {
      return faliedResponse(res, error);
    });
}

async function changelastLogin(email) {
  let dateLogin = {
    lastLogin: Date.now()
  };

  await User.findOneAndUpdate({ email: email }, dateLogin)
    .then(response => console.log(`OK: ${response}`))
    .catch(error => console.log(`NOK: ${error}`));
}

async function closeAcount(req, res) {
  await User.findOneAndDelete({ email: req.user })
    .then(user => {
      if (!user) notFound(res);
      successResponse(res, "Cuenta cerrada con éxito");
    })
    .catch(error => faliedResponse(res, error));
}

function successResponse(res, message) {
  return res.status(200).send(message);
}

function faliedResponse(res, error) {
  return res
    .status(500)
    .send({ message: `Error al realizar la petición - ${error}` });
}

function notFound(res) {
  return res.status(404).send({ message: "Usuario no registrado" });
}

module.exports = {
  signUp,
  signIn,
  closeAcount
};
