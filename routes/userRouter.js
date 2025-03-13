const express = require('express');
const router = express.Router();
const { createUser, getUser, modifyUser,deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/auth');

router.post('/user', createUser)
router.get('/user', verifyToken, getUser);
router.patch('/user/:idUser', modifyUser)
router.delete('/user/:idUser', deleteUser);


module.exports = router;
