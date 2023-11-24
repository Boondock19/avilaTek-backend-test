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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signoutUser = exports.signinUser = void 0;
const auth_1 = require("../services/auth");
/**
 * Archivo destinado a manejar la entrada y salida de datos de la API de Auth.
 */
/**
 * Funcion encargada de manejar el signin de un usuario.
 * @param req request de express
 * @param res response de express
 * @returns retorna al usuario que se logueo y el token
 */
const signinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (username === undefined || password === undefined) {
            throw new Error("Faltan datos necesarios para el signin");
        }
        const signinResponse = yield (0, auth_1.loginUser)(username, password);
        return res.status(200).json({
            msg: "Success",
            user: signinResponse === null || signinResponse === void 0 ? void 0 : signinResponse.foundUser,
            token: signinResponse === null || signinResponse === void 0 ? void 0 : signinResponse.token,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            return res.status(400).json({
                msg: error.message,
            });
    }
});
exports.signinUser = signinUser;
/**
 * Funcion encargada de manejar el signout de un usuario.
 * @param req request de express
 * @param res response de express
 * @returns Retorna el usuario que se deslogueo, nuevamente
 * al no tener una especificacion, devuelvo al usuario para facilitar
 * la verificacion del cambio de estado, pero se puede devolver una respuesta
 * positiva sin informacion del usuario.
 */
const signoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.id;
        if (!id) {
            throw new Error("Faltan datos necesarios para el signout");
        }
        const signoutResponse = yield (0, auth_1.logoutUser)(id);
        if (!signoutResponse)
            throw new Error("Usuario no existe");
        return res.status(200).json({
            msg: "Success",
            user: signoutResponse,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error)
            return res.status(400).json({
                msg: error.message,
            });
    }
});
exports.signoutUser = signoutUser;
