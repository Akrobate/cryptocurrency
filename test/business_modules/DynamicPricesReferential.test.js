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
        const dynamic_prices_referential = DynamicPricesReferential.getInstance();
        dynamic_prices_referential.injectDependencies(Binance.getInstance());
        dynamic_prices_referential.addCurrency('ADA');
        dynamic_prices_referential.addPriceCurrency('USDT');
        dynamic_prices_referential.addPriceCurrency('EUR');
        dynamic_prices_referential.addPriceCurrency('USD');
        await dynamic_prices_referential.update();
        const prices_state = dynamic_prices_referential.prices;

        console.log(prices_state);
        expect(prices_state).to.have.property('ADA');
        expect(prices_state.ADA).to.have.property('available_market_prices');
        expect(prices_state.ADA).to.have.property('prices');

    });


    it('updatePricesConversionMapping', () => {
        const dynamic_prices_referential = DynamicPricesReferential.getInstance();
        dynamic_prices_referential.injectDependencies(Binance.getInstance());
        dynamic_prices_referential.addCurrency('ADA');
        dynamic_prices_referential.addPriceCurrency('USDT');
        dynamic_prices_referential.addPriceCurrency('EUR');
        dynamic_prices_referential.addPriceCurrency('USD');

        dynamic_prices_referential.updatePricesConversionMapping();
    });

    it.only('updatePricesConversionMapping', async () => {
        const dynamic_prices_referential = DynamicPricesReferential.getInstance();
        dynamic_prices_referential.injectDependencies(Binance.getInstance());
        dynamic_prices_referential.addPriceCurrency('USDT');
        dynamic_prices_referential.addPriceCurrency('EUR');
        dynamic_prices_referential.addPriceCurrency('USD');

        const mapping_structure = dynamic_prices_referential
            .preparePricesConversionMappingStructure();
        expect(mapping_structure).to.have.property('USDT');
        expect(mapping_structure).to.have.property('EUR');
        expect(mapping_structure).to.have.property('USD');

        expect(mapping_structure.USDT).not.to.have.property('USDT');
        expect(mapping_structure.USDT).to.have.property('EUR');
        expect(mapping_structure.USDT).to.have.property('USD');

        const pair_list = dynamic_prices_referential
            .generatePairsFromPirceConversionMappingStructure(mapping_structure);

        const pair_prices = await dynamic_prices_referential
            .tryToGetRealPricesForPairs(pair_list);

        // console.log(mapping_structure);
        console.log(pair_list);
        console.log(pair_prices);
    });

    it('getAllAvailableBinancePairs', async () => {
        const dynamic_prices_referential = DynamicPricesReferential.getInstance();
        dynamic_prices_referential.injectDependencies(Binance.getInstance());
        const response = await dynamic_prices_referential
            .getAllAvailableBinancePairs();

        console.log(response);
    });

});

