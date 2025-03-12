const express = require('express');
const router = express.Router();
const { getAllEscritos, getById, deleteEscrito, addEscrito, modifyEntrada } = require('../controllers/escritosController');


router.get('/escritos', getAllEscritos);
router.get('/escritos/:idEscrito', getById);

router.delete('/escritos/:idEscrito', deleteEscrito);

router.post('/escritos', addEscrito)

router.patch('/escritos/:idEscrito', modifyEntrada)

module.exports = router;
