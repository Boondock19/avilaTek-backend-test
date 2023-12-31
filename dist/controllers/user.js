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
exports.userPost = exports.currentUserByIdGet = exports.userGet = void 0;
const user_1 = require("../services/user");
/**
 * Archivo destinado a manejar la entrada y salida de datos de la API de User.
 */
/**
 * Funcion para obtener los usuarios de la base de datos
 * de manera paginada, solicitda de manera obligatoria
 * page y limit, page indica la pagina que se quiere obtener
 * y limit la cantidad de registros que se quieren obtener
 * @param req Request de express
 * @param res Response de express
 * @returns Devuelve una respuesta positiva con un objeto que contiene
 * a los usuarios obtenidos, la pagina actual, y el total de paginas
 */
const userGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.query;
    try {
        if (page === undefined || limit === undefined) {
            throw new Error("Faltan datos necesarios para el obtener los usuarios");
        }
        const getUsersResponse = yield (0, user_1.getUsers)(Number(page), Number(limit));
        if (!getUsersResponse) {
            throw new Error("Error al obtener los usuarios");
        }
        const { users, totalUsers } = getUsersResponse;
        res.json({
            msg: "Success",
            users,
            totalPages: Math.ceil(totalUsers / Number(limit)),
            currentPage: page,
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
exports.userGet = userGet;
/**
 * Funcion para obtener al usuario actual que este logueado
 * en la app, se obtiene el id del usuario del token
 * @param req Request de express
 * @param res response de express
 * @returns  retorna una respuesta positiva con el usuario encontrado
 */
const currentUserByIdGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.id;
        if (!id) {
            throw new Error("No se encontro el id del usuario");
        }
        const userFound = yield (0, user_1.getUserById)(id);
        res.json({
            msg: "Success",
            user: userFound,
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
exports.currentUserByIdGet = currentUserByIdGet;
/**
 *  Funcion encargada de realizar el registro de un nuevo usuario
 * en el sistema, se solicita username, email y password
 * @param req request de express
 * @param res response de express
 * @returns retorna una respuesta positiva con el usuario creado.
 * Como no tenia especificaciones al respecto de que devolver en este caso,
 * decidi devolver el usuario creado, para facilidad al momento de verificar,
 * pero dependiendo de la logica del negocio, simplemente se podria devolver una
 * respuesta positiva indicando que se creo, pero sin informacion del usuario.
 */
const userPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (username === undefined ||
            email === undefined ||
            password === undefined) {
            throw new Error("Faltan datos necesarios para el registro");
        }
        const userResponse = yield (0, user_1.saveUser)(username, email, password);
        if (!userResponse) {
            throw new Error("Error al guardar el usuario");
        }
        return res.status(201).json({
            msg: "Success",
            user: userResponse,
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
exports.userPost = userPost;
