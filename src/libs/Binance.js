'use strict';

const axios = require('axios');

class Binance {

    base_api_url = 'https://api.binance.com/';

    /**
     * @returns {Promise<Object>}
     */
    checkConnectivity() {
        console.log('herreeeeee')
        return axios
            .get(`${this.cryptocompare_url}api/v3/ping`)
            .then((response) => response.data)
    }

}

module.exports = Binance;
