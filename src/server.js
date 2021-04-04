'use strict';

// Récupération du client mongodb
const bodyParser = require('body-parser');
const {
    CryptoCompare,
} = require('./repositories/api');

const crypto_compare = CryptoCompare.getInstance();

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/', (request, result) => {
    result.setHeader('Content-Type', 'application/json');
    result.status(200).json({
        foo: 'bar',
    });
});

app.get('/getcoinlist', (request, result) => {
    result.setHeader('Content-Type', 'application/json');
    return crypto_compare
        .getCoinList()
        .then((data) => result.status(200).json(data));
});

module.exports = app;
