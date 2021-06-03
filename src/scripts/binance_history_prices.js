'use strict';

const moment = require('moment');

const {
    BinancePriceDownloader,
} = require('../business_modules/BinancePriceDownloader');

const params = {
    symbol: 'ADAUSDT',
    interval_value: 1,
    interval_unit: 'm',
};

const binance_price_dowloader = BinancePriceDownloader.getInstance();

function timeToDate(time) {
    return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
}

// eslint-disable-next-line no-unused-vars
function displayRow(item) {
    return timeToDate(item[0]);
}

binance_price_dowloader.setBucketCallback((data) => {
    console.log(`${data.current_bucket} / ${data.total_buckets} - ${timeToDate(data.current_params.endTime)}`);
});

(async () => {

    await binance_price_dowloader.updateHistory(
        params.symbol,
        params.interval_value,
        params.interval_unit
    );

    // const resp = await binance_price_dowloader.downloadedFileIntegrityCheck('DOTUSDT', 1, 'm');
    // console.log(resp);
})();
