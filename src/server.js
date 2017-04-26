'use strict'

// Récupération du client mongodb
var bodyParser = require('body-parser');
var CryptoCompare = require('./libs/CryptoCompare');
var MinerGate = require('./libs/MinerGate');
var orm = require('./libs/orm');

// Paramètres de connexion
var url = 'mongodb://localhost/cryptocurrency';

var express = require('express');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json( { "foo": "bar" } );
});

app.get('/get', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json( { "foo": "bar" } );
});

app.get('/getcoinlist', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let crypto_compare = new CryptoCompare();
    crypto_compare.getCoinList((data) => {
        res.status(200).json( data );
    });
});

module.exports = app;
