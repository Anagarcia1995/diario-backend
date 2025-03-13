const UserModel = require('../models/userModel')
const bcrypt = require('bcrypt')
// const jwt = require ('jsonwebtoken');
const { generateToken } = require('../utils');

const signup =  async (req,res) => {
    try {
        const {name, lastName, email, password, profilePicture} = req.body;
        const newUser= {
            name,
            lastName,
            email,
            password: await bcrypt.hash(password, 10),
            profilePicture,
        }


        await UserModel.create(newUser);
        res.status(200).send("Usuario creado");

    } catch (error) {
        if(error.code ===11000) {
            res.status(500).send({status: "Failed", error: "El correo ya esta siendo utilizado en una cuenta."});
        }
        res.status(500).send({status: "Failed", error: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email:email});
        if(!user) {
            return res.status(404).send("Usuario o contraseña no validos.")
        }

        const validatePassword = await bcrypt.compare(password,user.password);
        if(!validatePassword) {
            return res.status(404).send("Usuario o contraseña no validos.");
        }

        const payload = {
            _id: user._id,
            name: user.name,
        };
        // const token =  jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "60min"});
        // const token_refresh =  jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, {expiresIn: "60min"});

        const token = generateToken(payload, false);
        const token_refresh = generateToken(payload, true);

        res.status(200).send({user,token, token_refresh});
    } catch (error) {
        res.status(500).send({status: "Failed", error: error.message});
    }
}

module.exports = {signup, login}