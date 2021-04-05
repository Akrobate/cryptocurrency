'use strict';

const {
    Router,
} = require('express');

const {
    CryptoCompare,
} = require('./repositories/api');

const crypto_compare = CryptoCompare.getInstance();

const route_collection = Router(); // eslint-disable-line new-cap
const base_url = '/';

route_collection.get('/',
    (request, response) => response
        .status(200).json({
            foo: 'bar',
        })
);

route_collection.get('/getcoinlist',
    (request, response) => crypto_compare
        .getCoinList()
        .then((data) => response
            .status(200)
            .json(data)
        )
);

module.exports = {
    base_url,
    route_collection,
};
