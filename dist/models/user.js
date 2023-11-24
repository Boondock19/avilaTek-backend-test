"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
    const _a = this.toObject(), { __v, password, _id } = _a, usuario = __rest(_a, ["__v", "password", "_id"]);
    usuario.id = _id;
    return usuario;
};
exports.User = (0, mongoose_1.model)("User", UserSchema);
