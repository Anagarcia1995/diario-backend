const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils');

const signup = async (req, res) => {
    try {
        const { name, lastName, email, password, profilePicture } = req.body;

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

        res.status(200).json({ success: true, message: "Usuario creado exitosamente", user, token, token_refresh });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(500).json({ success: false, error: "El correo ya está siendo utilizado en una cuenta." });
        }
        res.status(500).json({ success: false, error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(404).json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }

        const payload = { _id: user._id, name: user.name };
        const token = generateToken(payload, false);
        const token_refresh = generateToken(payload, true);

        res.status(200).json({ success: true, user, idUser: user._id, token, token_refresh });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { signup, login };
