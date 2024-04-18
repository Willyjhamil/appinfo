'use estrict'

const User = require('../models/user');
const service = require('../services');

async function signUp(req, res) {
    try {
        const newUser = new User({
            email: req.body.email,
            displayName: req.body.displayName
        });

        await newUser.save();

        const token = service.createToken(newUser);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: `Error al crear el usuario: ${error}` });
    }
}

async function signIn(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'No existe el usuario' });
        }

        // Verificar la contraseña aquí si es necesario

        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    signUp,
    signIn
}