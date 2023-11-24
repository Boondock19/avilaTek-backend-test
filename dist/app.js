"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./models/server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Archivo principal de la API, encargada de instanciar a la clase Sever para
 * iniciar el servidor.
 */
const server = new server_1.Server();
server.listen();
