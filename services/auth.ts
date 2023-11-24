import { comparePassword } from "../helpers/passwordEncrypt";
import mongoose from "mongoose";
import { User } from "../models/user";
import { generateJWT } from "../helpers/generateJWT";

// Necesitamos esta constante para poder hacer cast de un string a un ObjectId de mongo.
const ObjectId = mongoose.Types.ObjectId

/**
 * Funcion encargada de manejar la verificacion de los datos en la DB.
 * Si todo esta bien, le da acceso al usuario al app y se guarda
 * el estado positivo de la sesion.
 * @param username nombre del usuario
 * @param password contraseña del usuario
 * @returns al usuario con su sesion activa y el token generado.
 */

export const loginUser = async (username:string,password:string) => {
    try {
        // Verificar que el usuario exista en DB.
        // El username es unico por definicion de la coleccion
        const foundUser = await User.findOne({username})

        if(!foundUser) throw new Error('Usuario o contraseña incorrectos')

        

        // Verificar contraseña
        const passwordMatch =  comparePassword(password,foundUser.password)

        if(!passwordMatch) throw new Error('Usuario o contraseña incorrectos')

        // si el status es false, no se permite el login porque el usuario esta deshabilitado
        if(!foundUser.status) throw new Error('El usuario se encuentra deshabilitado, contacte al administrador')
        
        // si el usuario ya tiene una sesion activa, se permite el login
        // ya que si el token esta vencido o no, se permite que inicie sesion
       

        // si todo esta bien, se actualiza el campo session a true
        foundUser.session = true

        
        const token = generateJWT(foundUser.id)

        await foundUser.save()
        
        return {foundUser,token}
    } catch (error) {
        console.log(error)
        if(error instanceof Error) throw new Error(error.message)
    }
}


/**
 * Funcion encargada de manejar el logout de un usuario.
 * @param id id del usuario que desea hacer logout
 * @returns retorna al usuario con su sesion desactivada
 */

export const logoutUser = async (id:string) => {
    try {
        // Verificar que la sesion exista en DB.
        const foundUser = await User.findById(new ObjectId(id))

        

        if(!foundUser) throw new Error('Usuario no existe')


        // Si el usuario no tiene una sesion activa, no se permite el logout
        if(!foundUser.session) throw new Error('El usuario no tiene una sesion activa')

        // si todo esta bien, se actualiza el campo session a false
        foundUser.session = false

        await foundUser.save()

        return foundUser
    } catch (error) {
        console.log(error)
        if(error instanceof Error) throw new Error(error.message)
    }
}