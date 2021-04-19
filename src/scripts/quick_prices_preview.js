'use strict';

const Promise = require('bluebird');
const {
    Binance,
} = require('../repositories/api/Binance');

const binance = Binance.getInstance();


const cryptocurrencies = [
    'BTC',
    'ETH',
    'BNB',
    'ADA',
    'DOT',
    'EGLD',
];

const to_currency = 'EUR';

Promise.mapSeries(
    cryptocurrencies,
    (cryptocurrency) => binance
        .getLatestPrice(`${cryptocurrency}${to_currency}`)
        .then((result) => {
            console.log(`${cryptocurrency}\t ${result.price} ${to_currency.toLowerCase()}`);
        })
);
