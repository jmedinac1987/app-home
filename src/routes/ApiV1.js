"use strict";

const express = require("express");
const UserController = require("../controllers/UserController");
const apiV1 = express.Router();
//TODO: pendiente crear el middlewar de autenticación

//routes Users
//TODO: pendiente las rutas de restablecimeinto de contraseña, cambio de contraseña y cancelación de cuenta
apiV1.post("/signup", UserController.signUp);
apiV1.post("/signin", UserController.signIn);

module.exports = apiV1;
