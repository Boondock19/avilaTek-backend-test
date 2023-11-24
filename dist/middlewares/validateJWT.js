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
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Por alguna razon que desconozco dotenv me esta forzando a hacer el cargado
 * de las variables de entorno en este archivo, si no lo hago, no logra encontrar
 * a la variable de entorno SECRET_KEY
 */
dotenv_1.default.config();
// const ObjectId = mongoose.Types.ObjectId
const secretKey = process.env.SECRET_KEY || '';
/**
 * Funcion encargada de validar el token del usuario
 * y en caso positivo agregar el valor de id al request
 * @param req request de express con el atributo id agregado
 * @param res response de express
 * @param next next de express
 * @returns
 */
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("avila-token");
    const jwt = jsonwebtoken_1.default;
    if (!token) {
        return res.status(401).json({
            status: 'error',
            msg: 'No hay token en la petición'
        });
    }
    try {
        // Limpiamos el token
        const cleanToken = token.replace('Bearer ', '');
        // Tomamos el ID del payload
        const payload = jwt.verify(cleanToken, secretKey);
        //Buscamos al usuario en la DB
        const foundUser = yield user_1.User.findById(payload.id);
        if (!foundUser) {
            throw new Error("Usuario no encontrado");
        }
        // Agregamos el ID al request
        req.id = payload.id;
        next();
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({
                    status: 'error',
                    msg: 'Token expirado'
                });
            }
        }
        return res.status(401).json({
            status: 'error',
            msg: 'Token no válido'
        });
    }
});
exports.validateJWT = validateJWT;
