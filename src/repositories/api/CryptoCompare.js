'use strict';

const axios = require('axios');

class CryptoCompare {

    cryptocompare_min_url = 'https://min-api.cryptocompare.com/data/';
    cryptocompare_url = 'https://www.cryptocompare.com/api/data/';

    authorization_api_key = null;

    /**
     * @returns {Promise<Object>}
     */
    getCoinList() {
        return axios
            .get(`${this.cryptocompare_url}coinlist`)
            .then((response) => response.data);
    }

    /**
     * 
     * @param {String} fsym 
     * @param {String} tsyms 
     * @param {Function} callback
     * 
     * example params qs: { fsym: 'ETH', tsyms: 'BTC,USD,EUR' }
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
    getPriceHistorical({ fsym, tsyms, timestamp }) {
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
     * @returns {Object|Null}
     */
    generateHeader() {
        if (this.authorization_api_key) {
            return {
                headers: {
                    Authorization: `Apikey ${this.authorization_api_key}`, 
                },
            };
        }
    }

    /**
     * @param {String} authorization_api_key
     * @returns {Void}
     */
    getAuthorizationApiKey(authorization_api_key) {
        this.authorization_api_key = authorization_api_key;
    }
}

module.exports = CryptoCompare;
