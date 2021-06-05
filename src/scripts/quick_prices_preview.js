'use strict';

const {
    Binance,
} = require('../repositories/api/Binance');

const {
    CryptoCompare,
} = require('../repositories/api/CryptoCompare');

const binance = Binance.getInstance();
const crypto_compare = CryptoCompare.getInstance();

const cryptocurrencies = [
    'BTC',
    'ETH',
    'BNB',
    'ADA',
    'DOT',
    'EGLD',
    'DOGE',
    'VET',
];

const to_currency = 'EUR';

(async () => {
    console.log('=== Binance ===');
    for (const cryptocurrency of cryptocurrencies) {
        const result = await binance.getLatestPrice(`${cryptocurrency}${to_currency}`);
        console.log(`${cryptocurrency}\t ${Number(result.price)} ${to_currency}`);
    }

    console.log('=== CryptoCompare ===');
    for (const cryptocurrency of cryptocurrencies) {
        const result = await crypto_compare.getPrice(cryptocurrency, to_currency);
        console.log(`${cryptocurrency}\t ${Number(result[to_currency])} ${to_currency}`);
    }
})();
