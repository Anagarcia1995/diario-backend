const express = require('express');
const router = express.Router();
const { createUser, getUser, modifyUser, deleteUser, getUserById } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');

router.post('/user', createUser);  // Ruta para crear usuario con imagen
router.get('/user', verifyToken, getUser);
router.get('/user/:idUser', getUserById);
router.patch('/user/:idUser', modifyUser);  // Ruta para modificar usuario (con imagen)
router.delete('/user/:idUser', deleteUser);

module.exports = router;
