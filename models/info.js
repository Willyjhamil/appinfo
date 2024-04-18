'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    title: String,
    description: String,
    category: { type: String, enum: ['Consulta', 'Información', 'Opinión', 'Sugerencia', 'Comentario', 'Comunicado'] },
    idOfAuthor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    payToKnow: Boolean,
    siteOnline: String,
    score: { type: Number, min: 1, max: 5 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Info', infoSchema);