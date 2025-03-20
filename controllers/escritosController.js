const EscritoModel = require('../models/escritoModel');

const getAllEscritos = async (req, res) => {
  try {
    const entradas = await EscritoModel.find();
    res.status(200).send(entradas);
  } catch (error) {
    res.status(500).send({ status: 'Failed', error: error.message });
  }
};

const addEscrito = async (req, res) => {
  try {
    const { title, content, fraseDelDia, necesitoUnRespiroDe } = req.body;
    const userId = req.payload._id;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'El título y el contenido son obligatorios' });
    }

    const newEscrito = new EscritoModel({ title, content, fraseDelDia, necesitoUnRespiroDe, userId });
    await newEscrito.save();

    res.status(201).json({ success: true, message: 'Nuevo escrito creado', escrito: newEscrito });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear el escrito', error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const idEscrito = req.params.idEscrito;
    const escrito = await EscritoModel.findById(idEscrito);
    if (!escrito) return res.status(404).send('Entrada no encontrada');
    res.status(200).send(escrito);
  } catch (error) {
    res.status(500).send("Error al obtener el escrito.");
  }
};

const deleteEscrito = async (req, res) => {
  try {
    const idEscrito = req.params.idEscrito;
    const escrito = await EscritoModel.findByIdAndDelete(idEscrito);
    if (!escrito) return res.status(404).send('Entrada no encontrada');
    res.status(200).send("Se borró correctamente");
  } catch (error) {
    res.status(500).send("Error al obtener el escrito.");
  }
};

const modifyEntrada = async (req, res) => {
  try {
    const idEscrito = req.params.idEscrito;
    const updatedEscrito = req.body;

    const escrito = await EscritoModel.findByIdAndUpdate(idEscrito, updatedEscrito, { new: true });
    if (!escrito) return res.status(404).send("Entrada no encontrada");
    res.status(200).send(escrito);
  } catch (error) {
    res.status(500).send("Error al modificar el escrito.");
  }
};

module.exports = { getAllEscritos, getById, deleteEscrito, addEscrito, modifyEntrada };
