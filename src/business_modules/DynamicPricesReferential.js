'use strict';

class DynamicPricesReferential {


    // eslint-disable-next-line require-jsdoc
    constructor() {

        // prices holder example
        // example:
        // this.prices = {
        //     'ADA': {
        //         available_market_prices: {
        //             'USDT': 0.01,
        //         },
        //         prices: {
        //             'USDT': 0.01,
        //             'EUR': 0.02,
        //         },
        //     },
        // };
        this.prices = {};

        this.currency_list = [];
        this.price_currency_list = [];
    }


    // eslint-disable-next-line require-jsdoc
    static getInstance() {
        if (DynamicPricesReferential.instance === null) {
            DynamicPricesReferential.instance = new DynamicPricesReferential();
        }
        return DynamicPricesReferential.instance;
    }

    /**
     * @param {Object} binance_repository
     * @returns {void}
     */
    injectDependencies(binance_repository) {
        this.binance_repository = binance_repository;
    }


    // eslint-disable-next-line require-jsdoc
    async update() {
        for (let index_currency = 0; index_currency < this.currency_list.length; index_currency++) {
            const currency = this.currency_list[index_currency];
            for (
                let index_price = 0;
                index_price < this.price_currency_list.length;
                index_price++
            ) {
                const price_currency = this.price_currency_list[index_price];
                const result_euro = await this.binance_repository
                    .adaptSymbolAndGetLastestPrice(`${currency}${price_currency}`)
                    .catch(() => ({
                        price: null,
                    }));
                this.setMarketPrice(currency, price_currency, Number(result_euro.price));
            }
        }

        // if (this.price_euro === 0) {
        //     const result_usdt_euro = await this.binance_repository
        //         .adaptSymbolAndGetLastestPrice('USDTEUR');
        //     this.price_euro = Number(result_usdt_euro.price) * this.price_usdt;
        // }
    }

    // eslint-disable-next-line require-jsdoc
    updatePricesFromAvailableRealPrices() {
        Object.keys(this.prices).forEach((currency) => {
            this.price_currency_list.forEach((price_currency) => {
                if (this.prices[currency].available_market_prices[price_currency]) {
                    this.prices[currency].prices[price_currency] = this
                        .prices[currency].available_market_prices[price_currency];
                } else {
                    this.prices[currency].prices[price_currency] = null;
                }
            });
        });
    }


    // eslint-disable-next-line require-jsdoc
    setMarketPrice(currency, price_curency, value) {
        if (this.prices[currency] === undefined) {
            this.prices[currency] = {
                available_market_prices: {
                    [price_curency]: Number(value),
                },
            };
        } else if (this.prices[currency].available_market_prices === undefined) {
            this.prices[currency].available_market_prices = {
                [price_curency]: Number(value),
            };
        } else {
            this.prices[currency].available_market_prices[price_curency] = Number(value);
        }
    }

    // eslint-disable-next-line require-jsdoc
    addCurrency(currency) {
        if (!this.currency_list.includes(currency)) {
            this.currency_list.push(currency);
            this.prices[currency] = {
                available_market_prices: {},
                prices: {},
            };
        }
    }

    // eslint-disable-next-line require-jsdoc
    addPriceCurrency(currency) {
        if (!this.price_currency_list.includes(currency)) {
            this.price_currency_list.push(currency);
        }
    }

    // eslint-disable-next-line require-jsdoc
    getPrice(currency) {
        return this.price[currency].price;
    }
}

DynamicPricesReferential.instance = null;

module.exports = {
    DynamicPricesReferential,
};
