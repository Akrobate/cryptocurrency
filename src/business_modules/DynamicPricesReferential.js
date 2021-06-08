'use strict';

class DyncamicPricesReferential {


    // eslint-disable-next-line require-jsdoc
    constructor() {

        // prices holder example
        this.prices = {
            'ADA': {
                available_market_prices: {
                    'USDT': 0.01,
                },
                prices: {
                    'USDT': 0.01,
                    'EUR': 0.02,
                },
            },
        };

        this.currency_list = [];
        this.price_currency_list = [];
    }

    /**
     * @param {Object} market_repository
     * @returns {void}
     */
    injectDependencies(market_repository) {
        this.market_repository = market_repository;
    }

    // eslint-disable-next-line require-jsdoc
    update() {

    }

    // eslint-disable-next-line require-jsdoc
    addCurrency(currency) {
        this.currency_list.push(currency);
    }

    // eslint-disable-next-line require-jsdoc
    addPriceCurrency(currency) {
        this.price_currency_list.push(currency);
    }

    // eslint-disable-next-line require-jsdoc
    getPrice(currency) {
        return this.price[currency].price;
    }
}

DyncamicPricesReferential.instance = null;

module.exports = {
    DyncamicPricesReferential,
};
