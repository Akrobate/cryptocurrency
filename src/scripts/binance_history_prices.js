'use strict';

const moment = require('moment');

const {
    BinancePriceDownloader,
} = require('../business_modules/BinancePriceDownloader');

const available_intervals = [
    {
        value: 1,
        unit: 'm',
    },
    {
        value: 3,
        unit: 'm',
    },
    {
        value: 5,
        unit: 'm',
    },
    {
        value: 15,
        unit: 'm',
    },
    {
        value: 30,
        unit: 'm',
    },
    {
        value: 1,
        unit: 'h',
    },
    {
        value: 2,
        unit: 'h',
    },
    {
        value: 4,
        unit: 'h',
    },
    {
        value: 6,
        unit: 'h',
    },
    {
        value: 8,
        unit: 'h',
    },
    {
        value: 12,
        unit: 'h',
    },
    {
        value: 1,
        unit: 'd',
    },
    {
        value: 3,
        unit: 'd',
    },
    {
        value: 1,
        unit: 'w',
    },
    {
        value: 1,
        unit: 'M',
    },
];


const params = [
    {
        symbol: 'ADAUSDT',
        interval_value: 1,
        interval_unit: 'm',
    },
    {
        symbol: 'DOTUSDT',
        interval_value: 1,
        interval_unit: 'm',
    },
];

const binance_price_dowloader = BinancePriceDownloader.getInstance();

function timeToDate(time) {
    return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
}

// eslint-disable-next-line no-unused-vars
function displayRow(item) {
    return timeToDate(item[0]);
}

binance_price_dowloader.setBucketCallback((data) => {
    console.log(`${data.current_params.symbol} - ${data.current_bucket} / ${data.total_buckets} - ${timeToDate(data.current_params.endTime)}`);
});

(async () => {
    for (let params_index = 0; params_index < params.length; params_index++) {
        const {
            symbol,
            interval_value,
            interval_unit,
        } = params[params_index];

        await binance_price_dowloader.updateHistory(
            symbol,
            interval_value,
            interval_unit
        );
    }
})();
