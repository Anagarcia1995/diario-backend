const express = require('express');
const router = express.Router();
const { getAllEscritos, getById, deleteEscrito, addEscrito, modifyEntrada } = require('../controllers/escritosController');
const { verifyToken } = require('../middlewares/auth');  


router.get('/escritos', getAllEscritos);
router.get('/escritos/:idEscrito', getById);
router.delete('/escritos/:idEscrito', deleteEscrito);
router.post('/escritos',verifyToken, addEscrito)
router.patch('/escritos/:idEscrito', modifyEntrada)

module.exports = router;
