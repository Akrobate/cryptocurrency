'use strict';

const {
    Binance,
} = require('../repositories/api');

class BinancePriceDownloader {

    /**
     * @param {Binance} binance_repository
     * @returns {BinancePriceDownloader}
     */
    constructor(binance_repository) {
        this.binance_repository = binance_repository;

        this.symbol = null;
    }


    /**
     * @returns {BinancePriceDownloader}
     */
    static getInstance() {
        if (BinancePriceDownloader.instance === null) {
            BinancePriceDownloader.instance = new BinancePriceDownloader(
                Binance.getInstance()
            );
        }
        return BinancePriceDownloader.instance;
    }


    /**
     * buildInstance
     * @returns {BinancePriceDownloader}
     */
    static buildInstance() {
        return new BinancePriceDownloader(
            Binance.getInstance()
        );
    }


    /**
     * @return {Promise}
     */
    process() {

    }


    /**
     * @param {String} symbol
     * @returns {void}
     */
    setSymbol(symbol) {
        this.symbol = symbol;
    }

}

BinancePriceDownloader.instance = null;

module.exports = {
    BinancePriceDownloader,
};
