const mongoose = require("mongoose");
const Schema  = mongoose.Schema;

const diarioSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio."],
    minLength: [1,"El titulo debe tener al menos un caracter."],
    trim: true
  },
  content: {
    type: String, 
    required: [true, "El contenido es obligatorio."],
    minLength: [1,"El titulo debe tener al menos un caracter."],
    trim: true
  },
  necesitoUnRespiroDe: {
    type: String,
    trim: true
  },
  fraseDelDia: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {  // Campo para asociar el escrito con un usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
});

const Diario = mongoose.model("Diario", diarioSchema, "Diario"); 
module.exports = Diario;
