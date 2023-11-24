import { Router } from "express";
import { signinUser, signoutUser } from "../controllers/auth";
import { validateJWT } from "../middlewares/validateJWT";

/**
 * Achivo destinado a manejar las rutas de api para Auth.
 */

/**
 * Esta declaracion es necesaria para poder agregar el id del usuario al request en express
 */
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const router: Router = Router();

/**
 * Ruta para iniciar sesion.
 */

router.post("/signin", signinUser);

/**
 * Ruta para cerrar sesion.
 */
router.post("/signout", validateJWT, signoutUser);

export default router;
