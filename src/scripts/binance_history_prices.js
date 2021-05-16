'use strict';

const moment = require('moment');

const {
    Binance,
} = require('../repositories/api');


const binance = Binance.getInstance();

/**
 * @param {Array} data
 * @param {String} indicator
 * @param {Number} interval
 * @returns {Array}
 */
function movingAverage(data, indicator, interval) {

    
}


async function getData(
    symbol,
    interval,
    interval_unity,
    end_time,
    start_time,
    bucket_limit = 1000
) {

    end_time = Number(end_time);
    start_time = Number(start_time);
    
    let interval_seconds = 0;
    if (interval_unity === 'm') {
        interval_seconds = 60;
    }
    if (interval_unity === 'h') {
        interval_seconds = 60 * 60;
    }
    if (interval_unity === 'd') {
        interval_seconds = 60 * 60 * 24;
    }
    if (interval_unity === 'w') {
        interval_seconds = 60 * 60 * 24 * 7;
    }
    if (interval_unity === 'M') {
        interval_seconds = 60 * 60 * 24 * 30;
    }

    interval_seconds *= 1000;

    const total_seconds = end_time - start_time;

    const total_rows_count = total_seconds / (interval_seconds * interval);
    const rounded_total_rows_count = Math.ceil(total_rows_count);

    const total_buckets_count = rounded_total_rows_count / bucket_limit;

    const ceil_total_buckets_count = Math.ceil(rounded_total_rows_count / bucket_limit);
    const total_secondes_per_bucket = total_seconds / total_buckets_count;

    console.log(total_rows_count)
    console.log('rounded_total_rows_count', rounded_total_rows_count)
    console.log('ceil_total_buckets_count', ceil_total_buckets_count)
    console.log('end_time', end_time)
    console.log('start_time', start_time)
    console.log('total_seconds', total_seconds)
    console.log('interval_seconds', interval_seconds)
    console.log('total_buckets_count', total_buckets_count)
    console.log('total_secondes_per_bucket', total_secondes_per_bucket)

    const bucket_params = [];

    for (let index = 0; index < ceil_total_buckets_count; index++) {
        console.log(index);
        const param = {
            end_time: start_time + ((index + 1) * total_secondes_per_bucket),
            start_time: start_time + (index * total_secondes_per_bucket),
            end_time_: timeToDate(start_time + ((index + 1) * total_secondes_per_bucket)),
            start_time_: timeToDate(start_time + (index * total_secondes_per_bucket)),
        };
        bucket_params.push(param);
    }

    console.log(bucket_params);

    for (let index = 0; index < bucket_params.length; index++) {
        console.log("Deeeerrreeeee")
        const query_params = {
            symbol,
            interval: `${interval}${interval_unity}`,
            endTime: Math.round(bucket_params[index].end_time),
            startTime: Math.round(bucket_params[index].start_time),
            limit: bucket_limit,
        };
        console.log(query_params);
        try {
            const rst = await binance.getCandlestickData(query_params);
            console.log(rst.map(displayRow));
        } catch (error) {
            console.log(error);
        }
    }




/*
    const params_1 = {
        symbol,
        interval: `${interval}${interval_unity}`,
        endTime: end_time,
        startTime: start_time,
    };

    const result = await binance.getCandlestickData(params_1);
*/
}


function timeToDate(time) {
    return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
}

function displayRow(item) {
    return timeToDate(item[0]);
}

(async () => {



    const result = await getData(
        'XLMUSDT',
        5,
        'm',
        moment()
            .subtract(5, 'minutes')
            .format('x'),
        moment()
            .subtract(25, 'minutes')
            .format('x'),
        2
    );
return ;

console.log("==========================================================")
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

    const params_2 = {
        symbol: 'XLMUSDT',
        interval: '1m',
        endTime: moment()
            .subtract(0, 'minutes')
            .format('x'),
        startTime: moment()
            .subtract(20, 'minutes')
            .format('x'),
    };

    const result_1 = await binance.getCandlestickData(params_1);
    const result_2 = await binance.getCandlestickData(params_2);
    
    // const test = result.map((item) => {
    //     item[0] = moment.unix(Number(item[0]) / 1000).format('MM/DD/YYYY hh:mm:ss');
    //     return item;
    // });

    console.log(result_2.map(displayRow));
    console.log(result_1.map(displayRow));
    console.log(result_1);
    console.log(result_1.length);
    // console.log(result_1[0]);
    // console.log(result_1[499]);

})();
