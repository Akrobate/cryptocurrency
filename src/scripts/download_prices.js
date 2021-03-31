'use strict';

const {
    CryptoCompare,
} = require('./repositories/api');

const {
    MongoDbRepository,
} = require('./repositories');


function mainLoopGetHistoricalPrices() {

    const mongo_db_repository = MongoDbRepository.getInstance();
    const crypto_compare = CryptoCompare.getInstance();
    const collection_name = 'historical_prices';

    let timestamp = Math.floor(Date.now() / 1000);

    const options = {
        'limit': 1,
        'sort': {
            date: 1,
        },
    };

    mongo_db_repository.findDocumentList(collection_name, {}, options.limit, 0, null, options.sort)
        .then((data) => {
            console.log('Searching in collection');
            console.log(data);

            if (data.length === 1) {
                console.log(data[0].date);
                timestamp = Math.floor(new Date(data[0].date).getTime() / 1000);
                console.log(timestamp);
            }

            const params = {
                fsym: 'BTC',
                tsyms: 'EUR,USD',
                timestamp: timestamp - (24 * 3600),
            };

            crypto_compare
                .getPriceHistorical(params)
                .then((resp) => {
                    console.log(resp);
                    const data_to_insert = {
                        'USD': resp.BTC.USD,
                        'EUR': resp.BTC.EUR,
                        'sym': 'BTC',
                        'date': new Date(params.timestamp * 1000),
                    };
                    mongo_db_repository.insertDocument(collection_name, data_to_insert)
                        .then((res) => {
                            console.log(res);
                            setTimeout(() => mainLoopGetHistoricalPrices(), 10000);
                        });
                });
        });
}


mainLoopGetHistoricalPrices();
