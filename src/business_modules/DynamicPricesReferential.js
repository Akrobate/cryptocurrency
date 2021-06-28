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

        this.all_pairs_prices = null;
        // example
        // {
        //     USDT: {
        //         EUR: 0.01,
        //     },
        //     EUR: {
        //         USDT: 0.02
        //     }
        // }
        this.prices_conversion_mapper = {};

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
        this.updatePricesFromAvailableRealPrices();
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

    /**
     * Will provide a prices mapping to internally convert prices
     * between prices currencies
     * @return {void}
     */
    async updatePricesConversionMapping() {
        //
        const mapper = this.preparePricesConversionMappingStructure();

        console.log(mapper);
        /*
        const result_euro = await this.binance_repository
            .adaptSymbolAndGetLastestPrice(`${currency}${price_currency}`)
            .catch(() => ({
                price: null,
            }));
        */


    }


    /**
     * @return {Object}
     */
    preparePricesConversionMappingStructure() {
        const mapper = {};
        this.price_currency_list.forEach((item) => {
            mapper[item] = {};
            this
                .price_currency_list
                .filter((currency) => currency !== item)
                .forEach((currency) => {
                    mapper[item][currency] = {
                        price: null,
                    };
                });
        });
        return mapper;
    }


    /**
     * @param {*} mapper
     * @returns {Array}
     */
    generatePairsFromPirceConversionMappingStructure(mapper) {
        const all_prices_conversion_paris = [];
        Object.keys(mapper).forEach((from) => {
            Object.keys(mapper[from]).forEach((to) => {
                all_prices_conversion_paris.push({
                    from,
                    to,
                });
            });
        });
        return all_prices_conversion_paris;
    }

    /**
     *
     * @param {Array} pairs_list
     * @return {Array}
     */
    async tryToGetRealPricesForPairs(pairs_list) {

        const prices_pair_list = await this.getAllAvailableBinancePairs();

        const filtered_price = [];
        for (const pair of pairs_list) {
            // console.log("pari", pair);

            const price = prices_pair_list.find((item) => item.symbol === `${pair.from}${pair.to}`);
            filtered_price.push(price);
        }
        return filtered_price;

    }


    /**
     * @returns {Array}
     * @example
     *    [
     *        { symbol: 'ENJETH', price: '0.00051773' },
     *        { symbol: 'STORJBTC', price: '0.00001876' },
     *        { symbol: 'STORJETH', price: '0.00029910' },
     *        { symbol: 'BNBUSDT', price: '279.18000000' },
     *        { symbol: 'VENBNB', price: '0.14920000' },
     *        ... 1428 more items
     *    ]
     */
    async getAllAvailableBinancePairs() {
        const response = await this.binance_repository.getLatestPrice();
        this.all_pairs_prices = response;
        return this.all_pairs_prices;
    }
}

DynamicPricesReferential.instance = null;

module.exports = {
    DynamicPricesReferential,
};
