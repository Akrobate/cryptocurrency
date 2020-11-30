'use strict';

const axios = require('axios');

/**
 * @class Binance
 * 
 * Conncetor to interract with the Binance API
 * https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md#general-api-information
 * 
 */
class Binance {

    base_api_url = 'https://api.binance.com/';

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
    
}

module.exports = Binance;
