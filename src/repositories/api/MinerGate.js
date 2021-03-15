'use strict';

var request = require('request');

class MinerGate {

    minergate_url = 'https://api.minergate.com/1.0/';
    token = null;

    getProfitRating(callback) {
        request({ url: this.minergate_url + 'pool/profit-rating' }, (error, response, body) => {
            return callback(JSON.parse(body));
        });
    };

    login(login, password, callback) {
        let params = {
            login: login,
            password: password
        };

        let options = {
            url: this.minergate_url + 'pool/profit-rating',
            method: "POST",
            json: true,
            body: params
        };

        request(options, (error, response, body) => {
            let json_body = JSON.parse(body);
            this.token = json_body.token;
            return callback(json_body);
        });

    };

}

module.exports = MinerGate;
