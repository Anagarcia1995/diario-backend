const UserModel = require('../models/userModel');
const multer = require('multer');
const bcrypt = require('bcrypt');
const path = require('path');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // El nombre de archivo será único por fecha
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
}).single('profilePicture');  // Este es el campo del formulario que recibirá la imagen

// Controlador para crear un usuario
const createUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ status: 'Failed', error: err });
    }
    
    try {
      const { name, lastName, email, password } = req.body;
      const profilePicture = req.file ? req.file.path : '';  // Si se sube una foto, tomamos su ruta

      // Crear un nuevo usuario en la base de datos
      const newUser = {
        name,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        profilePicture,  // Guardar la ruta de la imagen
      };

      const user = await UserModel.create(newUser);

      // Aquí generamos el token de usuario (lo tienes que tener configurado ya)
      const payload = { _id: user._id, name: user.name };
      const token = generateToken(payload, false);
      const token_refresh = generateToken(payload, true);

      res.status(200).json({ success: true, user, token, token_refresh });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
};

// Obtener todos los usuarios (con la imagen, etc.)
const getUser = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ status: 'Failed', error: error.message });
  }
};

// Obtener un usuario por ID (incluyendo la imagen de perfil)
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

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.idUser);
    if (!user) return res.status(404).send('Usuario no encontrado');
    res.status(200).send("Se borró correctamente");
  } catch (error) {
    res.status(500).send("Error al obtener el usuario.");
  }
};

// Modificar un usuario (con la posibilidad de actualizar la imagen de perfil)
const modifyUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send({ status: 'Failed', error: err });
    }

    try {
      const { idUser } = req.params;
      const updateData = { ...req.body };

      // Si el usuario sube una nueva imagen, actualizamos la ruta de la foto
      if (req.file) {
        updateData.profilePicture = req.file.path;  // Nueva imagen
      }

      // Actualizamos el usuario en la base de datos
      const user = await UserModel.findByIdAndUpdate(idUser, updateData, { new: true });
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }

      res.status(200).json(user); // Devolvemos el usuario actualizado
    } catch (error) {
      res.status(500).send("Error al actualizar el usuario.");
    }
  });
};

module.exports = { createUser, getUser, modifyUser, deleteUser, getUserById };
