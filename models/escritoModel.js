const mongoose = require("mongoose");
const { Schema } = mongoose;

const diarioSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio."],
    minLength: [1,"El titulo debe tener al menos un caracter."],
    trim: true
  },
  content: {
    type: String, // Tipo de dato String para el contenido del diario
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
  }
});

// Crear el modelo con el nombre "Diario" y el esquema diarioSchema
const Diario = mongoose.model("Diario", diarioSchema, "Diario"); // Asegúrate de que el nombre de la colección sea "Diario"

module.exports = Diario;
