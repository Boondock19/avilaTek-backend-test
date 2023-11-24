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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../db/config");
const user_1 = require("../routes/user");
const auth_1 = require("../routes/auth");
/**
 * Clase encargar de lenvantar el servidor de express
 * en este archivo se maneja el uso de middlewares, rutas y el puerto
 * al igual que la llamada para inicializar la conexion a la base de datos
 */
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        this.usuariosPath = "/api/users";
        this.authPath = "/api/auth";
        //
        this.conectDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura y parseo del body
        this.app.use(express_1.default.json());
        // Directorio público
        this.app.use(express_1.default.static("public"));
    }
    conectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.dbConection)();
        });
    }
    routes() {
        this.app.use(this.usuariosPath, user_1.router);
        this.app.use(this.authPath, auth_1.router);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}
exports.Server = Server;
