'use strict';

const moment = require('moment');

const {
    Binance,
} = require('../repositories/api');


const binance = Binance.getInstance();

(async () => {
    const params = {
        symbol: 'XLMUSDT',
        interval: '15m',
        startTime: moment()
            .subtract(10000, 'days')
            .format('x'),
    };
    const result = await binance.getCandlestickData(params);
    const test = result.map((item) => {
        item[0] = moment.unix(Number(item[0]) / 1000).format("MM/DD/YYYY hh:mm:ss");
        return item;
    });
    console.log(result);
    console.log(result.length);
    console.log(result[0]);
    console.log(result[499]);
})();
