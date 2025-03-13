const express = require('express');
const { signup, login } = require('../controllers/loginController');
const router = express.Router();


router.post('/signup',signup )
router.get('/signup', );
router.patch('/signup/:idSignup', )
router.delete('/signup/:idSignup', );




router.post('/login', login )
router.get('/login', );
router.patch('/login/:idLogin', )
router.delete('/login/:idLogin', );


module.exports = router;
