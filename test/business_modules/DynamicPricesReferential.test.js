'use strict';

const {
    DynamicPricesReferential,
} = require('../../src/business_modules/');

const {
    Binance,
} = require('../../src/repositories/api/');

describe.only('DynamicPricesReferential', () => {

    it('Dynamic prices', async () => {
        const dyncamic_prices_referential = DynamicPricesReferential.getInstance();
        dyncamic_prices_referential.injectDependencies(Binance.getInstance());
        dyncamic_prices_referential.addCurrency('ADA');
        dyncamic_prices_referential.addPriceCurrency('USDT');
        const prices = await dyncamic_prices_referential.update();
    });

});

