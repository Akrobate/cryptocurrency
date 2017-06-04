'use strict'

// Récupération du client mongodb
var CryptoCompare = require('./libs/CryptoCompare');
var orm = require('./libs/orm');

// Paramètres de connexion
var url = 'mongodb://localhost/cryptocurrency';

mainLoopGetHistoricalPrices();

function mainLoopGetHistoricalPrices() {

    let crypto_compare = new CryptoCompare();
    const collection_name = 'historical_prices';

    let timestamp = Math.floor(Date.now() / 1000);

    let options = {
        "limit": 1,
        "sort":  { date: 1 }
    }

    orm.find(collection_name, {}, options, (data) => {
        console.log("=================");
        console.log(data);

        if (data.length == 1) {
            console.log(data[0].date);
            timestamp = Math.floor(new Date(data[0].date).getTime() / 1000);
            console.log(timestamp);
        }

        let params = {
            fsym: 'BTC',
            tsyms: 'EUR,USD',
            timestamp: timestamp - (24 * 3600)
        };

        crypto_compare.getPriceHistorical(params, (resp) => {
            console.log(resp);
            let data = {
                'USD': resp.BTC.USD,
                'EUR': resp.BTC.EUR,
                'sym': 'BTC',
                'date': new Date(params.timestamp * 1000)
            }
            orm.insert(collection_name, data, (res) => {
                console.log(res);

                setTimeout(function () {
                  mainLoopGetHistoricalPrices();
              }, 10000)

            });
        });
    });
}
