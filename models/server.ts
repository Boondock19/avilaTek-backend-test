import express, { Express } from "express";
import cors from 'cors'

import {dbConection} from '../db/config'
import { router as userRouter } from "../routes/user";
import { router as authRouter } from "../routes/auth";


/**
 * Clase encargar de lenvantar el servidor de express
 * en este archivo se maneja el uso de middlewares, rutas y el puerto
 * al igual que la llamada para inicializar la conexion a la base de datos
 */

export class Server {

    app: Express
    port: string
    usuariosPath: string
    authPath: string


    constructor() {
        this.app = express(); 
        this.port = process.env.PORT || '8000'
        this.usuariosPath = '/api/users'
        this.authPath = '/api/auth'

        //
        this.conectDB()
        // Middlewares
        this.middlewares()
        // Rutas de mi aplicación
        this.routes()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }

    async conectDB() {
        await dbConection()

    }

    routes()  {
       this.app.use(this.usuariosPath,userRouter)
       this.app.use(this.authPath,authRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }

} 

