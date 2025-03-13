const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio."],
    minLength: [1,"El nombre debe tener al menos un caracter."],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio."],
    minLength: [1,"El apellido debe tener al menos un caracter."],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio."],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria."],
  },
  profilePicture: {
    type: String,  
    required: false,
  },
});

const UserModel = mongoose.model('User', userSchema, 'user');
module.exports = UserModel