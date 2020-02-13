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
    if (err) return faliedResponse(res, err, 500);

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
        changelastLogin(res, req.body.email);
        return successResponse(res, {
          message: "Login correcto",
          token: service.createToken(user, req.originalUrl)
        });
      } else {
        return faliedResponse(res, "Email o Password incorrectos", 403);
      }
    })
    .catch(error => {
      return faliedResponse(res, error, 500);
    });
}

async function changelastLogin(res, email) {
  let dateLogin = {
    lastLogin: Date.now()
  };

  await User.findOneAndUpdate({ email: email }, dateLogin).catch(error =>
    faliedResponse(res, error, 500)
  );
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

function faliedResponse(res, error, codeHTTP) {
  return res
    .status(codeHTTP)
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
