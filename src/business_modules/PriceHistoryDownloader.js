'use strict';

const {
    MongoDbRepository,
} = require('../repositories');

class PriceHistoryDownloader {

    /**
     * @param {MongoDbRepository} mongo_db_repository
     * @returns {PriceHistoryDownloader}
     */
    constructor(mongo_db_repository) {
        this.mongo_db_repository = mongo_db_repository;
        this.collection_name = null;
        this.timestamp_interval_between_prices = 3600 * 24;
    }

    /**
     * @returns {PriceHistoryDownloader}
     */
    getInstance() {
        if (PriceHistoryDownloader.instance === null) {
            PriceHistoryDownloader.instance = new PriceHistoryDownloader(
                MongoDbRepository.getInstance()
            );
        }
    }

    /**
     * @return {Promise}
     */
    mainLoopGetHistoricalPrices() {

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
                    timestamp: timestamp - download_period,
                };

                return crypto_compare
                    .getPriceHistorical(params)
                    .then((resp) => {
                        console.log(resp);
                        const data_to_insert = {
                            'USD': resp.BTC.USD,
                            'EUR': resp.BTC.EUR,
                            'sym': 'BTC',
                            'date': new Date(params.timestamp * 1000),
                        };
                        return mongo_db_repository.insertDocument(collection_name, data_to_insert)
                            .then((res) => {
                                console.log(res);
                                setTimeout(() => mainLoopGetHistoricalPrices(), 10000);
                            });
                    });
            });
    }


    /**
     * @returns {Promise}
     */
    getLastItem() {
        const options = {
            'limit': 1,
            'sort': {
                date: 1,
            },
        };

        this.mongo_db_repository
            .findDocumentList(
                this.collection_name,
                {},
                options.limit,
                0,
                null,
                options.sort
            )
            .then((data) => {
                if (data.length === 1) {
                    timestamp = Math.floor(new Date(data[0].date).getTime() / 1000);
                }
            });

    }

    /**
     * @param {Number} interval
     * @returns {void}
     */
    setTimestrampIntervalBetweenPrices(interval) {
        this.timestamp_interval_between_prices = interval;
    }

}

PriceHistoryDownloader.instance = null;

module.exports = {
    PriceHistoryDownloader,
};
