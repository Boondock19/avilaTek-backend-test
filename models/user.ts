import { Schema, model } from "mongoose";

/**
 * Modelo de la coleccion user en la base datos
 * Como no tenia una especificacion del modelo
 * lo realice con los campos que me parecieron necesarios
 * como username, email, password, status y session
 * status : indica si el usuario esta habilitado o no
 * session : indica si el usuario tiene una sesion activa o no
 */

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  status: boolean;
  session: boolean;
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  session: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.id = _id;
  return usuario;
};

export const User = model<User>("User", UserSchema);
