'use strict';

const axios = require('axios');

/**
 * Conncetor to interract with the Binance API
 * https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#general-api-information
 *
 * https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#current-average-price
 */
class Binance {

    /**
     * @return {Binance}
     */
    static getInstance() {
        if (Binance.instance === null) {
            Binance.instance = new Binance();
        }
        return Binance.instance;
    }

    /**
     * @return {Binance}
     */
    constructor() {
        this.base_api_url = 'https://api.binance.com/';

        this.public_non_offical_base_api = 'https://www.binance.com/exchange-api/v2/';
    }

    /**
     * @returns {Promise<Object>}
     */
    checkConnectivity() {
        return axios
            .get(`${this.base_api_url}api/v3/ping`)
            .then((response) => response.data);
    }

    /**
     * @returns {Promise<Object>}
     */
    getServerTime() {
        return axios
            .get(`${this.base_api_url}api/v3/time`)
            .then((response) => response.data);
    }

    /**
     * @returns {Promise<Object>}
     */
    getExchangeInfo() {
        return axios
            .get(`${this.base_api_url}api/v3/exchangeInfo`)
            .then((response) => response.data);
    }

    /**
     * @param {String} symbol
     * @param {Arra<Number>} limit Default 100; max 5000. Valid limits:[5, 10, 20, 50, 100, 500, 1000, 5000]
     * @returns {Promise<Object>}
     */
    getOrderBook(symbol, limit) {
        return axios
            .get(`${this.base_api_url}api/v3/depth`,
                {
                    params: {
                        limit,
                        symbol,
                    },
                })
            .then((response) => response.data);
    }

    /**
     *
     * @param {String} symbol
     * @returns {Object}
     * {
     *   "mins": 5,
     *   "price": "9.35751834"
     *   }
     */
    getCurrentAveragePrice(symbol) {
        return axios
            .get(`${this.base_api_url}api/v3/avgPrice`,
                {
                    params: {
                        symbol,
                    },
                })
            .then((response) => response.data);
    }

    /**
     * Returns the current price
     * @param {String} symbol
     * @returns {Object}
     *
     * @example
     * getLatestPrice('ADAEUR')
     * {
     *   symbol: 'ADAEUR',
     *   price: '1.07795000',
     *   }
     */
    getLatestPrice(symbol) {
        return axios
            .get(`${this.base_api_url}api/v3/ticker/price`,
                {
                    params: {
                        symbol,
                    },
                })
            .then((response) => response.data);
    }

    /**
     *
     * @param {String} symbol
     * @returns {Object}
     * {
     *   "mins": 5,
     *   "price": "9.35751834"
     *   }
     */
    get24HoursTickerPriceChangeStatistics(symbol) {
        return axios
            .get(`${this.base_api_url}api/v3/ticker/24hr`,
                {
                    params: {
                        symbol,
                    },
                })
            .then((response) => response.data);
    }

    /**
     *
     * @param {String} symbol
     * @returns {Object}
     * {
     *   "mins": 5,
     *   "price": "9.35751834"
     *   }
     */
    getAll24HoursTickerPriceChangeStatistics() {
        return axios
            .get(`${this.base_api_url}api/v3/ticker/24hr`)
            .then((response) => response.data);
    }

    /**
     *
     * @param {Object} params
     * @param {String} params.symbol required
     * @param {String} params.interval required
     * @param {Number} params.startTime
     * @param {Number} params.endTime
     * @param {Number} params.limit Default 500; max 1000.
     * @returns {Object}
     *
     *   [
     *    1499040000000,      // Open time
     *    "0.01634790",       // Open
     *    "0.80000000",       // High
     *    "0.01575800",       // Low
     *    "0.01577100",       // Close
     *    "148976.11427815",  // Volume
     *    1499644799999,      // Close time
     *    "2434.19055334",    // Quote asset volume
     *    308,                // Number of trades
     *    "1756.87402397",    // Taker buy base asset volume
     *    "28.46694368",      // Taker buy quote asset volume
     *    "17928899.62484339" // Ignore.
     *  ]
     */
    getCandlestickData(params) {
        return axios
            .get(`${this.base_api_url}api/v3/klines`,
                {
                    params,
                }
            )
            .then((response) => response.data);
    }


    /**
     * @param {String} symbol
     * @return {Object}
     */
    async adaptSymbolAndGetLastestPrice(symbol) {
        switch (symbol) {
            case 'USDTEUR':
                return {
                    symbol: 'USDTEUR',
                    price: 1 / Number((await this.getLatestPrice('EURUSDT')).price),
                };
            default:
                return this.getLatestPrice(symbol);
        }
    }

    //
    //  "s":"BTCUSDT",
    //  "st":"TRADING",
    //  "b":"BTC",
    //  "q":"USDT",
    //  "ba":"฿",
    //  "a":"",
    //  "I":"0.00000100",
    //  "ts":"0.01",
    //  "an":"Bitcoin",
    //  "qn":"TetherUS",
    //  "o":"46915.84",
    //  "h":"47499.43",
    //  "l":"44961.09",
    //  "c":"46791.85",
    //  "v":"91500.82",
    //  "qv":"4248420233.17226301",
    //  "y":0,
    //  "as":91500.81462400,
    //  "pm":"FIAT",
    //  "pn":"FIAT",
    //  "cs":18620881,
    //  "tags":["pow","mining-zone"],
    //  "pom":false,
    //  "pomt":null,
    //  "etf":false
    //
    //  Market cap = cs * c;
    //
    /**
     * @return {Object}
     */
    publicAssetServiceGetProduct() {
        return axios
            .get(`${this.public_non_offical_base_api}public/asset-service/product/get-products`)
            .then((response) => response.data);
    }
}

Binance.instance = null;

module.exports = {
    Binance,
};
