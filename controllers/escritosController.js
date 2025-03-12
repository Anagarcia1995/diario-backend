const EscritoModel = require('../models/escritoModel');

const getAllEscritos = async (req, res) => {
  try {
    const entradas =  await EscritoModel.find()
    res.status(200).send(entradas)
  } catch (error) {
    res.status(500).send({status: 'Failed', error: error.message})
  }
};

const addEscrito = async (req, res) => {
  try {
    const escritoData = req.body;
    await EscritoModel.create(escritoData)
    res.status(200).send("Nuevo escrito creado")
  } catch (error) {
    res.status(500).send({status: 'Failed', error: error.message})
  }
}

const getById = async (req, res) => {
  try {
    const idEscrito = req.params.idEscrito;
    const escrito = await EscritoModel.findById(idEscrito);
    if(!escrito){
      return res.status(404).send('Entrada no encontrada')
    }
    return res.status(200).send(escrito);
  } catch (error) {
    res.status(500).send("Error al obtener el escrito.");
  }
};

const deleteEscrito = async (req, res) => {
  try {
    const idEscrito = req.params.idEscrito;
    const escrito = await EscritoModel.findByIdAndDelete(idEscrito)
    if(!escrito){
      return res.status(404).send('Entrada no encontrada');
    }
    return res.status(200).send("Se borró correctamente");
  } catch (error) {
    res.status(500).send("Error al obtener el escrito.");
  }
};

const modifyEntrada = async (req, res) => {
  try {
    const idEscrito = req.params.idEscrito;
    const newEscrito = req.body;
    const escrito = await EscritoModel.findByIdAndUpdate(idEscrito, newEscrito, {new:true});
    if(!escrito){
      return res.status(404).send("Entrada no encontrada");
    }
    return res.status(200).send(escrito);
  } catch (error) {
    res.status(500).send("Error al obtener el escrito.");

  }
}

module.exports = { getAllEscritos, getById, deleteEscrito, addEscrito, modifyEntrada };
