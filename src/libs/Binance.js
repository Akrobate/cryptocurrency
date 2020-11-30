'use strict';

const axios = require('axios');

class Binance {

    base_api_url = 'https://api.binance.com/';

    /**
     * @returns {Promise<Object>}
     */
    checkConnectivity() {
        return axios
            .get(`${this.base_api_url}api/v3/ping`)
            .then((response) => response.data)
    }

}

module.exports = Binance;
