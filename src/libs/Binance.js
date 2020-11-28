'use strict';

const axios = require('axios');

class Binance {

    base_api_url = 'https://www.cryptocompare.com/api/data/';

    /**
     * @returns {Promise<Object>}
     */
    checkConnectivity() {
        return axios
            .get(`${this.cryptocompare_url}api/v3/ping`)
            .then((response) => response.data);
    }

}

module.exports = CryptoCompare;
