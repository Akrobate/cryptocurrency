'use strict';

const bodyParser = require('body-parser');
const {
    base_url,
    route_collection,
} = require('./routes');

const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(base_url, route_collection);

// catch 404
app.use((request, result) => result.status(404).send({}));

// error management
app.use((error, request, response, next) => {
    response.status(500).send({
        error: error.message,
    });
    next();
});

module.exports = {
    app,
};
