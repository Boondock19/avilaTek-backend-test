"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = void 0;
const passwordEncrypt_1 = require("../helpers/passwordEncrypt");
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const generateJWT_1 = require("../helpers/generateJWT");
// Necesitamos esta constante para poder hacer cast de un string a un ObjectId de mongo.
const ObjectId = mongoose_1.default.Types.ObjectId;
/**
 * Funcion encargada de manejar la verificacion de los datos en la DB.
 * Si todo esta bien, le da acceso al usuario al app y se guarda
 * el estado positivo de la sesion.
 * @param username nombre del usuario
 * @param password contraseña del usuario
 * @returns al usuario con su sesion activa y el token generado.
 */
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar que el usuario exista en DB.
        // El username es unico por definicion de la coleccion
        const foundUser = yield user_1.User.findOne({ username });
        if (!foundUser)
            throw new Error("Usuario o contraseña incorrectos");
        // Verificar contraseña
        const passwordMatch = (0, passwordEncrypt_1.comparePassword)(password, foundUser.password);
        if (!passwordMatch)
            throw new Error("Usuario o contraseña incorrectos");
        // si el status es false, no se permite el login porque el usuario esta deshabilitado
        if (!foundUser.status)
            throw new Error("El usuario se encuentra deshabilitado, contacte al administrador");
        // si el usuario ya tiene una sesion activa, se permite el login
        // ya que si el token esta vencido o no, se permite que inicie sesion
        // si todo esta bien, se actualiza el campo session a true
        foundUser.session = true;
        const token = (0, generateJWT_1.generateJWT)(foundUser.id);
        yield foundUser.save();
        return { foundUser, token };
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
});
exports.loginUser = loginUser;
/**
 * Funcion encargada de manejar el logout de un usuario.
 * @param id id del usuario que desea hacer logout
 * @returns retorna al usuario con su sesion desactivada
 */
const logoutUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar que la sesion exista en DB.
        const foundUser = yield user_1.User.findById(new ObjectId(id));
        if (!foundUser)
            throw new Error("Usuario no existe");
        // Si el usuario no tiene una sesion activa, no se permite el logout
        if (!foundUser.session)
            throw new Error("El usuario no tiene una sesion activa");
        // si todo esta bien, se actualiza el campo session a false
        foundUser.session = false;
        yield foundUser.save();
        return foundUser;
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
});
exports.logoutUser = logoutUser;
