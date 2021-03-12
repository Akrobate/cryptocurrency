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
    constructor() {
        this.base_api_url = 'https://api.binance.com/';
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
     *
     * @param {String} symbol
     * @returns {Object}
     * {
     *   "mins": 5,
     *   "price": "9.35751834"
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

}

module.exports = Binance;
