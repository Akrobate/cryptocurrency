'use strict';

const moment = require('moment');

const {
    Binance,
} = require('../repositories/api');

class BinancePriceDownloader {

    /**
     * @param {Binance} binance_repository
     * @returns {BinancePriceDownloader}
     */
    constructor(binance_repository) {
        this.binance_repository = binance_repository;
        this.bucket_callback_function = null;
    }


    /**
     * @returns {BinancePriceDownloader}
     */
    static getInstance() {
        if (BinancePriceDownloader.instance === null) {
            BinancePriceDownloader.instance = new BinancePriceDownloader(
                Binance.getInstance()
            );
        }
        return BinancePriceDownloader.instance;
    }


    /**
     * buildInstance
     * @returns {BinancePriceDownloader}
     */
    static buildInstance() {
        return new BinancePriceDownloader(
            Binance.getInstance()
        );
    }


    /**
     * @param {*} symbol
     * @param {*} interval_value
     * @param {*} interval_unit
     * @param {*} start_time
     * @param {*} end_time
     * @param {*} bucket_limit
     * @returns {Array}
     */
    async getData(
        symbol,
        interval_value,
        interval_unit,
        start_time,
        end_time,
        bucket_limit = 1000
    ) {

        const interval_millis_duration = this.getSecondMillisDuration(
            interval_value,
            interval_unit
        );
        const bucket_params = this.getQueryParamList(
            Number(start_time),
            Number(end_time),
            interval_millis_duration,
            bucket_limit
        );

        // console.log(bucket_params);

        const full_results = [];
        for (let index = 0; index < bucket_params.length; index++) {
            const query_params = {
                symbol,
                interval: `${interval_value}${interval_unit}`,
                endTime: bucket_params[index].end_time,
                startTime: bucket_params[index].start_time,
                limit: bucket_limit,
            };
            // console.log(query_params);
            try {
                const rst = await this.binance_repository.getCandlestickData(query_params);
                full_results.push(rst);
                // console.log(rst.map((item) => this.displayRow(item)));
                if (this.bucket_callback_function) {
                    this.bucket_callback_function({
                        total_buckets: bucket_params.length,
                        current_bucket: index,
                        current_params: query_params,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        const result = [].concat(...full_results);
        // console.log(result.map((item) => this.displayRow(item)));
        return result;
    }


    /**
     * @param {*} interval_value
     * @param {*} interval_unit
     * @return {Number}
     */
    getSecondMillisDuration(interval_value, interval_unit) {

        let interval_seconds = 0;
        if (interval_unit === 'm') {
            interval_seconds = 60;
        }
        if (interval_unit === 'h') {
            interval_seconds = 60 * 60;
        }
        if (interval_unit === 'd') {
            interval_seconds = 60 * 60 * 24;
        }
        if (interval_unit === 'w') {
            interval_seconds = 60 * 60 * 24 * 7;
        }
        if (interval_unit === 'M') {
            interval_seconds = 60 * 60 * 24 * 30;
        }

        const total_duration = interval_seconds * interval_value;
        const interval_seconds_milliseconds = total_duration * 1000;
        return interval_seconds_milliseconds;
    }


    /**
     * @param {*} start_time
     * @param {*} end_time
     * @param {*} interval_millis_duration
     * @param {*} bucket_limit
     * @returns {Array}
     */
    getQueryParamList(start_time, end_time, interval_millis_duration, bucket_limit) {

        const total_seconds = end_time - start_time;
        const ceil_total_rows_count = Math.ceil(total_seconds / interval_millis_duration);
        const total_buckets_count = ceil_total_rows_count / bucket_limit;
        const ceil_total_buckets_count = Math.ceil(total_buckets_count);
        const total_secondes_per_bucket = total_seconds / total_buckets_count;

        const bucket_params = [];

        for (let index = 0; index < ceil_total_buckets_count; index++) {
            // console.log(index);
            const theorical_end_time = Math
                .round(start_time + ((index + 1) * total_secondes_per_bucket));
            const param = {
                end_time: theorical_end_time > end_time ? end_time : theorical_end_time,
                start_time: Math.round(start_time + (index * total_secondes_per_bucket)),
                end_time_: this.timeToDate(start_time + ((index + 1) * total_secondes_per_bucket)),
                start_time_: this.timeToDate(start_time + (index * total_secondes_per_bucket)),
            };
            bucket_params.push(param);
        }

        return bucket_params;
    }


    /**
     * @param {*} time
     * @returns {String}
     */
    timeToDate(time) {
        return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
    }


    /**
     * @param {*} item
     * @returns {Object}
     */
    displayRow(item) {
        return this.timeToDate(item[0]);
    }


    /**
     * @param {Funcntion} func
     * @returns {void}
     */
    setBucketCallback(func) {
        this.bucket_callback_function = func;
    }

    /**
     *
     * @param {*} symbol
     * @returns {Number}
     */
    async findStartTime(symbol) {

        try {
            const month_interval_results = await this.binance_repository
                .getCandlestickData({
                    symbol,
                    interval: '1M',
                    limit: 1000,
                });

            const [
                first_month,
            ] = month_interval_results;

            // console.log(this.timeToDate(first_month[0]));

            const day_interval_results = await this.binance_repository
                .getCandlestickData({
                    symbol,
                    startTime: Number(first_month[0]),
                    interval: '1d',
                    limit: 366,
                });

            const [
                first_day,
            ] = day_interval_results;

            // console.log(this.timeToDate(first_day[0]));

            const hour_interval_results = await this.binance_repository
                .getCandlestickData({
                    symbol,
                    startTime: Number(first_day[0]),
                    interval: '1h',
                    limit: 25,
                });

            const [
                first_hour,
            ] = hour_interval_results;

            // console.log(this.timeToDate(first_hour[0]));

            const minute_interval_results = await this.binance_repository
                .getCandlestickData({
                    symbol,
                    startTime: Number(first_hour[0]),
                    interval: '1m',
                    limit: 61,
                });

            const [
                first_minute,
            ] = minute_interval_results;

            return Number(first_minute[0]);

        } catch (error) {
            console.log('findStartTime Error: ', error);
            throw error;
        }
    }
}

BinancePriceDownloader.instance = null;

module.exports = {
    BinancePriceDownloader,
};
