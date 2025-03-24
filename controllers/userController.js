const UserModel = require('../models/userModel');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    }
    cb('Error: La imagen debe ser JPEG, JPG o PNG');
  }
}).single('profilePicture');  

const createUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ status: 'Failed', error: err });
    }
    
    try {
      const { name, lastName, email, password } = req.body;
      const profilePicture = req.file ? req.file.path : ''; 
      const newUser = {
        name,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        profilePicture, 
      };

      const user = await UserModel.create(newUser);

      const payload = { _id: user._id, name: user.name };
      const token = generateToken(payload, false);
      const token_refresh = generateToken(payload, true);

      res.status(200).json({ success: true, user, token, token_refresh });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: 'Failed', error: error.message });
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
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ status: 'Failed', error: err });
    }

    try {
      const { idUser } = req.params;
      const updateData = { ...req.body };

      if (req.file) {
        updateData.profilePicture = req.file.path; 
      }

      const user = await UserModel.findByIdAndUpdate(idUser, updateData, { new: true });
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      res.status(200).json(user); 
    } catch (error) {
      res.status(500).send("Error al actualizar el usuario.");
    }
  });
};

module.exports = { createUser, getUser, modifyUser, deleteUser, getUserById };
