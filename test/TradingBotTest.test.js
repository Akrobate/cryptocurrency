'use strict';

const {
    expect,
} = require('chai');

const {
    VirtualMarket,
} = require('../src/business_modules/VirtualMarket');
const {
    TradingAgent,
} = require('../src/business_modules/TradingAgent');

const {
    JsonFile,
} = require('../src/repositories/JsonFile');

describe.only('TradingBot unit test', () => {

    it('sdffsdf', () => {
        const test = [1, 2, 3];

        console.log(test);
        test.unshift(0);
        test.pop();
        console.log(test);
    });

    it.only('Test', async () => {

        const symbol = 'ADAUSDT';
        const interval_value = 1;
        const interval_unit = 'm';

        // parameter Agent
        const tranding_agent = TradingAgent.buildTradingAgent();

        // Parameter Agent wallets
        tranding_agent.getWalletInstance('ADA');
        tranding_agent.getWalletInstance('USDT').deposit(200);
        console.log('ADA', tranding_agent.getWalletInstance('ADA').getBalance());
        console.log('USDT', tranding_agent.getWalletInstance('USDT').getBalance());


        const filename = `${symbol}_${interval_value}${interval_unit}.json`;
        const json_file = JsonFile.getInstance();
        json_file.setFileName(filename);
        const historical_data = await json_file.getData();

        const virtual_market = new VirtualMarket(symbol, interval_value, interval_unit);
        virtual_market.setData(historical_data);


        tranding_agent.setTradingMarket(virtual_market);

        virtual_market.tick_real_duration = 0;
        // price, volume, side, callback
        virtual_market.addOrder(
            0.265,
            10,
            'buy',
            (data) => {
                console.log('=========order==========');
                console.log(data);
                console.log('=========/order==========');
            }
        );

        virtual_market.addOrder(
            0.266,
            10,
            'buy',
            (data) => {
                console.log('=========order==========');
                console.log(data);
                console.log('=========/order==========');
            }
        );

        virtual_market.start();

/*
        for (let tick = 0; tick < 1000; tick++) {

            console.log('orders.length', virtual_market.orders.length);
            await virtual_market.processInterval();
            virtual_market.displayTickData();
            if (virtual_market.orders.length === 0) {
                break;
            }
        }
*/
    })
        .timeout(30000);

});
