'use strict';

const {
    expect,
} = require('chai');

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
        await dyncamic_prices_referential.update();
        const prices_state = dyncamic_prices_referential.prices;
        expect(prices_state).to.have.property('ADA');
        expect(prices_state.ADA).to.have.property('available_market_prices');
        expect(prices_state.ADA).to.have.property('prices');

    });

});

