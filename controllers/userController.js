const UserModel = require('../models/userModel');

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    await UserModel.create(userData);
    res.status(200).send("Nuevo usuario creado");
  } catch (error) {
    res.status(500).send({status: 'Failed', error: error.message});
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({status: 'Failed', error: error.message});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.idUser);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener el usuario' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.idUser);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.status(200).send("Se borró correctamente");
  } catch (error) {
    res.status(500).send("Error al obtener el usuario.");
  }
};

const modifyUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.idUser, req.body, { new: true });
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error al obtener el usuario.");
  }
};

module.exports = { createUser, getUser, modifyUser, deleteUser, getUserById };
