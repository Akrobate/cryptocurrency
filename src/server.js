'use strict';

// Récupération du client mongodb
const bodyParser = require('body-parser');
const CryptoCompare = require('./repositories/api/CryptoCompare');

// Paramètres de connexion
// const url = 'mongodb://localhost/cryptocurrency';

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/', (request, result) => {
    result.setHeader('Content-Type', 'application/json');
    result.status(200).json({
        foo: 'bar',
    });
});

app.get('/get', (request, result) => {
    result.setHeader('Content-Type', 'application/json');
    result.status(200).json({
        foo: 'bar',
    });
});

app.get('/getcoinlist', (request, result) => {
    result.setHeader('Content-Type', 'application/json');
    // @TODO: make a singleton with this
    const crypto_compare = new CryptoCompare();
    return crypto_compare
        .getCoinList()
        .then((data) => result.status(200).json(data));
});

module.exports = app;
