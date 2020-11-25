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


    getPriceHistorical(params, callback) {
        request({ url: this.cryptocompare_min_url + 'pricehistorical',
                qs:
                    { fsym: params.fsym, tsyms: params.tsyms, ts: params.timestamp } 
                }, function (error, response, body) {
            return callback(JSON.parse(body));
        });
    }
}

module.exports = CryptoCompare;
