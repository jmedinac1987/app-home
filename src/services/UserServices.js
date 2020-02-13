"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("../config");

//TODO: pendiente definir el iss de la aplicación Front-end
function createToken(user, url) {
  const payload = {
    sub: user.email,
    iss: "https://localhost:4200" + url,
    udn: user.displayName,
    iat: moment().unix(),
    exp: moment()
      .add(14, "days")
      .unix()
  };

  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
  const decode = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);

      if (payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: "El token ha expirado"
        });
      }

      resolve(payload.sub);
    } catch (err) {
      reject({
        status: 403,
        message: "Token invalido"
      });
    }
  });

  return decode;
}

module.exports = {
  createToken,
  decodeToken
};
