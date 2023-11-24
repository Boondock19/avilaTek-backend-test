"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Por alguna razon que desconozco dotenv me esta forzando a hacer el cargado
 * de las variables de entorno en este archivo, si no lo hago, no logra encontrar
 * a la variable de entorno SECRET_KEY
 */
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY || "";
const jwt = jsonwebtoken_1.default;
// Funcion para crear un jwt en base a un payload, en este caso es solo el id
const generateJWT = (payload) => {
    const token = jwt.sign({ id: payload }, secretKey, { expiresIn: "6h" });
    return token;
};
exports.generateJWT = generateJWT;
