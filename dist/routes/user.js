"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_1 = require("../controllers/user");
const user_validator_1 = require("../validators/user.validator");
const validateJWT_1 = require("../middlewares/validateJWT");
/**
 * Archivo destinado a manejar las rutas de api para User.
 * Realize la validacion de los datos ingresados  o esperados
 * por los endpoints con express-validator, si es endpoint requiere
 * el uso de jwt, entonces se le pasa el middleware validateJWT para confirmar
 * que el jwt es valido y guardar el id del usuario en el request.
 */
exports.router = (0, express_1.Router)();
// get sin paginacion
exports.router.get("/", user_validator_1.userGetPaginationsValidator, user_1.userGet);
exports.router.get("/currentuser", validateJWT_1.validateJWT, user_1.currentUserByIdGet);
exports.router.post("/signup", user_validator_1.userCreateValidator, user_1.userPost);
exports.default = exports.router;
