'use strict';

var request = require('request');

var cryptocompare_min_url = 'https://min-api.cryptocompare.com/data/';
var cryptocompare_url = 'https://www.cryptocompare.com/api/data/';

function CryptoCompare() {

    this.getCoinList = function(callback) {
        request({ url: cryptocompare_url + 'coinlist' }, function (error, response, body) {
            return callback(JSON.parse(body));
        });
    }

    // Example of working params: qs: { fsym: 'ETH', tsyms: 'BTC,USD,EUR' }
    this.getPrice = function(fsym, tsyms, callback) {
        request( { url: cryptocompare_min_url + 'price', qs: { fsym: fsym, tsyms: tsyms } }, function (error, response, body) {
            return callback(JSON.parse(body));
        });
    }


    this.getPriceHistorical = function(params, callback) {
        request({ url: cryptocompare_min_url + 'pricehistorical',
                qs:
                    { fsym: params.fsym, tsyms: params.tsyms, ts: params.timestamp } 
                }, function (error, response, body) {
            return callback(JSON.parse(body));
        });
    }


}

module.exports = CryptoCompare;
