'use strict'

const info = require('../models/info');

async function getInfo (req, res) {
    try {
        const infoId = req.params.infoId;
        
        const info = await info.findById(infoId);
        if (!info) {
            return res.status(404).send({ message: 'La información no existe' });
        }

        res.status(200).send({ info });
    } catch (error) {
        console.error(`Error al realizar la petición: ${error}`);
        res.status(500).send({ message: `Error al realizar la petición: ${error}` });
    }
}

async function getInfos (req, res) {
    try {
        // Obtener todos los documentos de la colección "info"
        const allInfos = await info.find();
        
        // Enviar la lista de documentos como respuesta
        res.status(200).send({ info: allInfos });
    } catch (error) {
        console.error(`Error al obtener la lista de infos: ${error}`);
        res.status(500).send({ message: `Error al obtener la lista de infos: ${error}` });
    }
}

async function saveInfo (req, res) {
    try {
        console.log('/api/info');
        console.log(req.body);

        // Crear una nueva instancia del modelo Info
        const newInfo = new info({
            title: req.body.keyword,
            description: req.body.description,
            category: req.body.category,
            idOfAuthor: req.body.idOfAuthor,
            payToKnow: req.body.payToKnow,
            siteOnline: req.body.siteOnline,
            score: req.body.score,
            create_on: req.body.create_on,
            update_on: req.body.update_on
        });

        // Guardar la información en la base de datos
        const infoStored = await newInfo.save();

        // Devolver una respuesta al cliente
        res.status(200).send({ info: infoStored });
    } catch (error) {
        // Manejar errores
        console.error(`Error al guardar en la base de datos: ${error}`);
        res.status(500).send({ message: `Error al guardar en la base de datos: ${error}` });
    }
}

async function updateInfo(req, res) {
    try {
        const infoId = req.params.infoId;
        const update = req.body;

        // Actualizar la información por su ID
        const infoUpdated = await info.findByIdAndUpdate(infoId, update, { new: true });
        
        if (!infoUpdated) {
            return res.status(404).send({ message: 'La información no existe' });
        }

        res.status(200).send({ infos: infoUpdated });
    } catch (error) {
        console.error(`Error al actualizar la información: ${error}`);
        res.status(500).send({ message: `Error al actualizar la información: ${error}` });
    }
}

async function deleteInfo (req, res) {
    try {
        const infoId = req.params.infoId;

        // Eliminar la información por su ID
        const info = await info.findByIdAndDelete(infoId);
        
        if (!info) {
            return res.status(404).send({ message: 'La información no existe' });
        }

        res.status(200).send({ message: 'La información ha sido eliminada' });
    } catch (error) {
        console.error(`Error al borrar la información: ${error}`);
        res.status(500).send({ message: `Error al borrar la información: ${error}` });
    }
}

module.exports = {
    getInfo,
    getInfos,
    saveInfo,
    updateInfo,
    deleteInfo
};