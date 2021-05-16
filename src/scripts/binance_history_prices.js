'use strict';

const moment = require('moment');

const {
    Binance,
} = require('../repositories/api');

const {
    BinancePriceDownloader,
} = require('../business_modules/BinancePriceDownloader');

const binance_price_dowloader = BinancePriceDownloader.getInstance();

const binance = Binance.getInstance();

function timeToDate(time) {
    return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
}

function displayRow(item) {
    return timeToDate(item[0]);
}

(async () => {

    const result = await binance_price_dowloader.getData(
        'XLMUSDT',
        1,
        'd',
        moment()
            .subtract(1, 'days')
            .format('x'),
        moment()
            .subtract(21, 'days')
            .format('x'),
        1000
    );
    console.log(result);
    console.log(result.map(displayRow));

    const params_1 = {
        symbol: 'XLMUSDT',
        interval: '1w',
        endTime: moment()
            .subtract(7, 'days')
            .format('x'),
        startTime: moment()
            .subtract(14, 'days')
            .format('x'),
        limit: 1,
    };

    const result_1 = await binance.getCandlestickData(params_1);
    console.log(result_1.map(displayRow));

})();
