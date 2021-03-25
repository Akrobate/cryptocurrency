'use strict';

const axios = require('axios');

class CryptoCompare {

    /**
     * @return {CryptoCompare}
     */
    static getInstance() {
        if (CryptoCompare.instance === null) {
            CryptoCompare.instance = new CryptoCompare();
        }
        return CryptoCompare.instance;
    }

    /**
     * @returns {CryptoCompare}
     */
    constructor() {
        this.cryptocompare_min_url = 'https://min-api.cryptocompare.com/data/';
        this.cryptocompare_url = 'https://www.cryptocompare.com/api/data/';
        this.authorization_api_key = null;
    }

    /**
     * @returns {Promise<Object>}
     */
    getCoinList() {
        return axios
            .get(`${this.cryptocompare_url}coinlist`)
            .then((response) => response.data);
    }

    /**
     * example params qs: { fsym: 'ETH', tsyms: 'BTC,USD,EUR' }
     * @param {String} fsym
     * @param {String} tsyms
     * @param {Function} callback
     * @returns {Object}
     */
    getPrice(fsym, tsyms) {
        return axios
            .get(`${this.cryptocompare_min_url}price`,
                {
                    params: {
                        fsym,
                        tsyms,
                    },
                }
            )
            .then((response) => response.data);
    }

    /**
     * @param {Object} param
     * @param {String} param.fsym
     * @param {String} param.tsyms
     * @param {Number} param.timestamp
     * @returns {Promise<Object>}
     */
    getPriceHistorical({
        fsym,
        tsyms,
        timestamp,
    }) {
        return axios
            .get(`${this.cryptocompare_min_url}pricehistorical`,
                {
                    params: {
                        fsym,
                        tsyms,
                        ts: timestamp,
                    },
                })
            .then((response) => response.data);
    }

    /**
     * @returns {Object}
     */
    generateHeader() {
        if (this.authorization_api_key) {
            return {
                headers: {
                    Authorization: `Apikey ${this.authorization_api_key}`,
                },
            };
        }
        return {};
    }

    /**
     * @param {String} authorization_api_key
     * @returns {Void}
     */
    getAuthorizationApiKey(authorization_api_key) {
        this.authorization_api_key = authorization_api_key;
    }
}

CryptoCompare.instance = null;

module.exports = {
    CryptoCompare,
};
