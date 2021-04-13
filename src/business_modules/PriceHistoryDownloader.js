'use strict';

const {
    MongoDbRepository,
} = require('../repositories');

const {
    CryptoCompare,
} = require('../repositories/api');

class PriceHistoryDownloader {

    /**
     * @param {MongoDbRepository} mongo_db_repository
     * @param {CryptoCompare} crypto_compare
     * @returns {PriceHistoryDownloader}
     */
    constructor(mongo_db_repository, crypto_compare) {
        this.mongo_db_repository = mongo_db_repository;
        this.crypto_compare = crypto_compare;

        this.collection_name = null;
        this.timestamp_interval_between_prices = 3600 * 24;
    }

    /**
     * @returns {PriceHistoryDownloader}
     */
    getInstance() {
        if (PriceHistoryDownloader.instance === null) {
            PriceHistoryDownloader.instance = new PriceHistoryDownloader(
                MongoDbRepository.getInstance(),
                CryptoCompare.getInstance()
            );
        }
    }

    /**
     * buildInstance
     * @returns {PriceHistoryDownloader}
     */
    buildInstance() {
        return new PriceHistoryDownloader(
            MongoDbRepository.getInstance(),
            CryptoCompare.getInstance()
        );
    }

    /**
     * @return {Promise}
     */
    mainLoopGetHistoricalPrices() {

        let timestamp = Math.floor(Date.now() / 1000);
        this.getLastItem()
            .then((last_known_timestamp) => {
                if (last_known_timestamp) {
                    timestamp = last_known_timestamp;
                }

                const params = {
                    fsym: 'BTC',
                    tsyms: 'EUR,USD',
                    timestamp: timestamp - this.timestamp_interval_between_prices,
                };

                return this.crypto_compare
                    .getPriceHistorical(params)
                    .then((response) => {
                        console.log(response);
                        const data_to_insert = {
                            'USD': response.BTC.USD,
                            'EUR': response.BTC.EUR,
                            'sym': 'BTC',
                            'date': new Date(params.timestamp * 1000),
                        };
                        return this.mongo_db_repository
                            .insertDocument(this.collection_name, data_to_insert)
                            .then(() => {
                                setTimeout(() => this.mainLoopGetHistoricalPrices(), 10000);
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
                    return Math.floor(new Date(data[0].date).getTime() / 1000);
                }
                return null;
            });

    }

    /**
     * @param {Number} interval
     * @returns {void}
     */
    setTimestrampIntervalBetweenPrices(interval) {
        this.timestamp_interval_between_prices = interval;
    }

    /**
     * @param {Number} collection_name
     * @returns {void}
     */
    setCollectionName(collection_name) {
        this.collection_name = collection_name;
    }

}

PriceHistoryDownloader.instance = null;

module.exports = {
    PriceHistoryDownloader,
};
