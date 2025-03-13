const UserModel = require('../models/userModel');


const createUser = async (req, res) => {
  try {
    const userData = req.body;
    await UserModel.create(userData)
    res.status(200).send("Nuevo usuario creado")
  } catch (error) {
    res.status(500).send({status: 'Failed', error: error.message})
  }
}

const getUser = async (req, res) => {
  try {
    const user =  await UserModel.find()
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({status: 'Failed', error: error.message})
  }
};

const deleteUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const user = await UserModel.findByIdAndDelete(idUser)
    if(!user){
      return res.status(404).send('Usuario no encontrado');
    }
    return res.status(200).send("Se borró correctamente");
  } catch (error) {
    res.status(500).send("Error al obtener el usuario.");
  }
};

const modifyUser = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const newUser = req.body;
    const user = await UserModel.findByIdAndUpdate(idUser, newUser, {new:true});
    if(!user){
      return res.status(404).send("Usuario no encontrado");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send("Error al obtener el usuario.");

  }
}

module.exports = { createUser,getUser,  modifyUser, deleteUser };
