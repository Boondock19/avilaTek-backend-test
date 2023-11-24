"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.passwordEncrypt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
// Funcion para encriptar la contraseña
const passwordEncrypt = (password) => {
    const saltRounds = 10;
    const salt = bcrypt_1.default.genSaltSync(saltRounds);
    const passwordHash = bcrypt_1.default.hashSync(password, salt);
    return passwordHash;
};
exports.passwordEncrypt = passwordEncrypt;
// Funcion para comparar la contraseña ingresada con la contraseña encriptada
// retorna un valor booleano true si son iguales, false si no lo son
const comparePassword = (password, passwordHash) => {
    return bcrypt_1.default.compareSync(password, passwordHash);
};
exports.comparePassword = comparePassword;
