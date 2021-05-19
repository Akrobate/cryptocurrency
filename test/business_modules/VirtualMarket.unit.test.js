'use strict';

const {
    expect,
} = require('chai');

const {
    VirtualMarket,
} = require('../../src/business_modules/VirtualMarket');

const {
    JsonFile,
} = require('../../src/repositories/JsonFile');

describe('VirtualMarket unit test', () => {

    it.skip('Test', async () => {

        const symbol = 'ADAUSDT';
        const interval_value = 1;
        const interval_unit = 'm';

        const filename = `${symbol}_${interval_value}${interval_unit}.json`;
        const json_file = JsonFile.getInstance();
        json_file.setFileName(filename);
        const historical_data = await json_file.getData();

        const virtual_market = new VirtualMarket(symbol, interval_value, interval_unit);
        virtual_market.setData(historical_data);


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


        for (let tick = 0; tick < 1000; tick++) {

            console.log('orders.length', virtual_market.orders.length);
            virtual_market.processInterval();
            virtual_market.displayTickData();
            if (virtual_market.orders.length === 0) {
                break;
            }
        }

    })
        .timeout(30000);

});
