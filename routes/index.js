'use strict'

const express = require('express');
const infoCtrl = require('../controllers/info');
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.get('/info', infoCtrl.getInfos);
api.get('/info/:infoId', infoCtrl.getInfo);
api.post('/info', infoCtrl.saveInfo);
api.put('/info/:infoId', infoCtrl.updateInfo);
api.delete('/info/:infoId', infoCtrl.deleteInfo);

// Users
api.post('/signup', userCtrl.signUp);
api.post('/signin', userCtrl.signIn);
api.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Tienes acceso' });
});

module.exports = api;