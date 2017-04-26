'use strict';

var request = require('request');

var minergate_url = 'https://api.minergate.com/1.0/';

function MinerGate() {

    this.token = null;

    this.getProfitRating = function(callback) {
        request({ url: minergate_url + 'pool/profit-rating' }, function (error, response, body) {
            return callback(JSON.parse(body));
        });
    };

    this.login = function(login, password, callback) {
        let self = this;
        let params = {
            login: login,
            password: password
        };

        let options = {
            url: minergate_url + 'pool/profit-rating',
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
