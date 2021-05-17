'use strict';

const moment = require('moment');

const {
    Binance,
} = require('../repositories/api');
const {
    JsonFile,
} = require('../repositories/JsonFile');

const {
    BinancePriceDownloader,
} = require('../business_modules/BinancePriceDownloader');

const binance_price_dowloader = BinancePriceDownloader.getInstance();
const json_file = JsonFile.getInstance();

// const binance = Binance.getInstance();

function timeToDate(time) {
    return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
}

function displayRow(item) {
    return timeToDate(item[0]);
}


async function updateHistory(symbol, interval_value, interval_unit) {

    const filename = `${symbol}_${interval_value}${interval_unit}.json`;
    console.log(filename);
    const millis_interval = binance_price_dowloader
        .getSecondMillisDuration(interval_value, interval_unit);

    json_file.setFileName(filename);


    let start_time = 0;
    const end_time = moment().format('x') - millis_interval;

    let saved_data = [];

    try {
        saved_data = await json_file.getData();
        for (let i = saved_data.length - 10; i < saved_data.length; i++) {
            console.log(timeToDate(saved_data[i][0]));
            console.log(saved_data[i]);
        }
        console.log(saved_data.length);
        const last = saved_data[saved_data.length - 1];
        console.log(timeToDate(last[0]));
        start_time = Number(last[0]) + millis_interval;
    } catch (error) {
        start_time = await binance_price_dowloader.findStartTime(symbol);
    }

    const result = await binance_price_dowloader.getData(
        symbol,
        interval_value,
        interval_unit,
        start_time,
        end_time,
        1000
    );

    await json_file.saveData([].concat(saved_data, result));

    console.log(result.map(displayRow));


}


binance_price_dowloader.setBucketCallback((data) => {
    console.log(`${data.current_bucket} / ${data.total_buckets} - ${timeToDate(data.current_params.endTime)}`);
});

(async () => {

    await updateHistory('ADAUSDT', 1, 'm');

    return ;
    const start_date = await binance_price_dowloader.findStartTime('DOTUSDT');
    // const aaa = await binance_price_dowloader.findStartTime('XLMUSDT');
    console.log(timeToDate(start_date));


    const result = await binance_price_dowloader.getData(
        // 'XLMUSDT',
        // 'ADABUSD',
        'DOTUSDT',
        1,
        'm',
        // moment()
        //     .subtract(5, 'years')
        //     .format('x'),
        start_date,
        moment()
            .subtract(1, 'm')
            .format('x'),
        1000
    );
    // console.log(result);
    console.log(result.map(displayRow));

    json_file.setFileName('DOTUSDT_1m.json');
    json_file.saveData(result);

    // const params_1 = {
    //    symbol: 'XLMUSDT',
    //    interval: '1w',
    //    endTime: moment()
    //        .subtract(7, 'days')
    //        .format('x'),
    //    startTime: moment()
    //        .subtract(14, 'days')
    //        .format('x'),
    //    limit: 1,
    // };

    // const result_1 = await binance.getCandlestickData(params_1);
    // console.log(result_1.map(displayRow));

})();
