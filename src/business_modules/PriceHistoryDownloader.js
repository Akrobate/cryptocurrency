'use strict';

class PriceHistoryDownloader {

    /**
     * @returns {PriceHistoryDownloader}
     */
    constructor() {
        this.collection_name = null;
        this.timestamp_interval_between_prices = 3600 * 24;
    }

    /**
     * @returns {PriceHistoryDownloader}
     */
    getInstance() {
        if (PriceHistoryDownloader.instance === null) {
            PriceHistoryDownloader.instance = new PriceHistoryDownloader();
        }
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
