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
exports.getUsers = exports.getUserById = exports.saveUser = void 0;
const passwordEncrypt_1 = require("../helpers/passwordEncrypt");
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
// Necesitamos esta constante para poder hacer cast de un string a un ObjectId de mongo.
const ObjectId = mongoose_1.default.Types.ObjectId;
/**
 * Funcion encargada de manejar la verificacion de los datos en la DB.
 * Si todo esta bien, se crea el usuario y se guarda en la DB.
 * @param username nombre del usuario
 * @param email email del usuario
 * @param password contraseña del usuario
 * @returns al usuario creado en la base de datos.
 */
const saveUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar que el usuario no exista en DB.
        // Buscar el user por email que es unico
        const foundUser = yield user_1.User.findOne({ email });
        if (foundUser) {
            throw new Error("El usuario ya existe");
        }
        // Encriptar contraseña
        const passwordEncrypted = (0, passwordEncrypt_1.passwordEncrypt)(password);
        // Crear usuario
        const user = new user_1.User({ username, email, password: passwordEncrypted });
        // Guardar en DB
        yield user.save();
        return user;
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
});
exports.saveUser = saveUser;
/**
 * De momento esta funcion es utulizada por la ruta de currentuser,
 * pero se puede reutilizar para obtener a un usuario por su ID con
 * otra ruta.
 * Funcion encargarda de obtener a un usuario por su id
 * @param id id del usuario
 * @returns al susuario encontrado
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            throw new Error("El id es requerido");
        const foundUser = yield user_1.User.findById(id);
        if (!foundUser)
            throw new Error("El usuario no existe");
        return foundUser;
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
});
exports.getUserById = getUserById;
/**
 *
 * @param page pagina que se quiere obtener
 * @param limit cuantos registros se quieren obtener
 * @returns un objeto con los valores de la paginacion (total de usuaruos) y los usuarios encontrados segun el limit
 */
const getUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const totalUsers = yield user_1.User.countDocuments();
        return { users, totalUsers };
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            throw new Error(error.message);
    }
});
exports.getUsers = getUsers;
