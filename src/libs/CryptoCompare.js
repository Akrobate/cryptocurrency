'use strict';

const request = require('request');
const axios = require('axios');

class CryptoCompare {

    cryptocompare_min_url = 'https://min-api.cryptocompare.com/data/';
    cryptocompare_url = 'https://www.cryptocompare.com/api/data/';

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
                })
            .then((response) => response.data);
    }


    getPriceHistorical({ fsym, tsyms, timestamp }, callback) {
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
}

module.exports = CryptoCompare;
