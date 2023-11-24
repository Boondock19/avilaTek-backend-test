"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validateJWT_1 = require("../middlewares/validateJWT");
exports.router = (0, express_1.Router)();
/**
 * Ruta para iniciar sesion.
 */
exports.router.post("/signin", auth_1.signinUser);
/**
 * Ruta para cerrar sesion.
 */
exports.router.post("/signout", validateJWT_1.validateJWT, auth_1.signoutUser);
exports.default = exports.router;
