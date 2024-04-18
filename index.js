'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

/* // BÚSQUEDA POR CATEGORÍA
app.get('/api/infos/categoria/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const categoria = await Infos.find({ category: req.params.id });
        res.json(categoria);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// BÚSQUEDA POR PALABRAS EN DESCRIPCIÓN
app.get('/api/infos/description/:phrase', async (req, res) => {
    try {
        const phrase = req.params.phrase;
        const result = await Infos.find({ description: { $regex: phrase, $options: 'i' } });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// BÚSQUEDA POR PALABRA CLAVE
app.get('/api/infos/keyword/:keyword', async (req, res) => {
    try {
        const keyword = req.params.keyword;
        const result = await Infos.find({ keyword: { $regex: keyword, $options: 'i' } });
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); */

mongoose.connect(config.db)
    .then(() => {
        console.log(`Conexion con MONGODB exitosa con puerto`)
        app.listen(config.port, () => { console.log(`Servidor en funcionamiento: ${config.port}`) });
    })
    .catch( error => console.log("Error de conexion con MongoDB", error));