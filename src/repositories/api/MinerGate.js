'use strict';

const request = require('request');

class MinerGate {

    /**
     * @returns {MinerGate}
     */
    constructor() {
        this.token = null;
        this.minergate_url = 'https://api.minergate.com/1.0/';
    }

    /**
     * @returns {Promise}
     */
    getProfitRating() {
        return new Promise((resolve, reject) => request(
            {
                url: `${this.minergate_url}pool/profit-rating`,
            },
            (error, response, body) => {
                if (error) {
                    return reject(error);
                }
                return resolve(JSON.parse(body));
            })
        );
    }

    /**
     *
     * @param {*} login
     * @param {*} password
     * @returns {Promise}
     */
    login(login, password) {
        return new Promise((resolve, reject) => request(
            {
                url: `${this.minergate_url}pool/profit-rating`,
                method: 'POST',
                json: true,
                body: {
                    login,
                    password,
                },
            },
            (error, resoponse, body) => {
                if (error) {
                    reject(error);
                }
                const json_body = JSON.parse(body);
                this.token = json_body.token;
                return resolve(json_body);
            })
        );
    }

}

module.exports = {
    MinerGate,
};
