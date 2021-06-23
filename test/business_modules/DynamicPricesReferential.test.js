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
        dyncamic_prices_referential.addPriceCurrency('EUR');
        dyncamic_prices_referential.addPriceCurrency('USD');
        await dyncamic_prices_referential.update();
        const prices_state = dyncamic_prices_referential.prices;

        console.log(prices_state);
        expect(prices_state).to.have.property('ADA');
        expect(prices_state.ADA).to.have.property('available_market_prices');
        expect(prices_state.ADA).to.have.property('prices');

    });


    it('updatePricesConversionMapping', () => {
        const dyncamic_prices_referential = DynamicPricesReferential.getInstance();
        dyncamic_prices_referential.injectDependencies(Binance.getInstance());
        dyncamic_prices_referential.addCurrency('ADA');
        dyncamic_prices_referential.addPriceCurrency('USDT');
        dyncamic_prices_referential.addPriceCurrency('EUR');
        dyncamic_prices_referential.addPriceCurrency('USD');

        dyncamic_prices_referential.updatePricesConversionMapping();
    });

    it.only('updatePricesConversionMapping', () => {
        const dyncamic_prices_referential = DynamicPricesReferential.getInstance();
        dyncamic_prices_referential.addPriceCurrency('USDT');
        dyncamic_prices_referential.addPriceCurrency('EUR');
        dyncamic_prices_referential.addPriceCurrency('USD');

        const mapping_structure = dyncamic_prices_referential
            .preparePricesConversionMappingStructure();
        expect(mapping_structure).to.have.property('USDT');
        expect(mapping_structure).to.have.property('EUR');
        expect(mapping_structure).to.have.property('USD');

        expect(mapping_structure.USDT).not.to.have.property('USDT');
        expect(mapping_structure.USDT).to.have.property('EUR');
        expect(mapping_structure.USDT).to.have.property('USD');
    });

});

