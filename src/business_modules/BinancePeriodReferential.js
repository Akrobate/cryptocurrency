'use strict';

class BinancePeriodReferential {

    /**
     * @return {Object}
     */
    static get INTERVAL() {
        return {
            MINUTE: 'm',
            HOUR: 'h',
            DAY: 'd',
            WEEK: 'w',
            MONTH: 'M',
        };
    }

    /**
     * @param {*} interval_value
     * @param {*} interval_unit
     * @return {Number}
     */
    static getSecondMillisDuration(interval_value, interval_unit) {

        let interval_seconds = 0;
        if (interval_unit === BinancePeriodReferential.INTERVAL.MINUTE) {
            interval_seconds = 60;
        }
        if (interval_unit === BinancePeriodReferential.INTERVAL.HOUR) {
            interval_seconds = 60 * 60;
        }
        if (interval_unit === BinancePeriodReferential.INTERVAL.DAY) {
            interval_seconds = 60 * 60 * 24;
        }
        if (interval_unit === BinancePeriodReferential.INTERVAL.WEEK) {
            interval_seconds = 60 * 60 * 24 * 7;
        }
        if (interval_unit === BinancePeriodReferential.INTERVAL.MONTH) {
            interval_seconds = 60 * 60 * 24 * 30;
        }

        const total_duration = interval_seconds * interval_value;
        const interval_seconds_milliseconds = total_duration * 1000;
        return interval_seconds_milliseconds;
    }


    /**
     * All available periods
     * @return {Array}
     */
    static get AVAILABLE_PERIODS() {
        return [
            {
                value: 1,
                unit: BinancePeriodReferential.INTERVAL.MINUTE,
            },
            {
                value: 3,
                unit: BinancePeriodReferential.INTERVAL.MINUTE,
            },
            {
                value: 5,
                unit: BinancePeriodReferential.INTERVAL.MINUTE,
            },
            {
                value: 15,
                unit: BinancePeriodReferential.INTERVAL.MINUTE,
            },
            {
                value: 30,
                unit: BinancePeriodReferential.INTERVAL.MINUTE,
            },
            {
                value: 1,
                unit: BinancePeriodReferential.INTERVAL.HOUR,
            },
            {
                value: 2,
                unit: BinancePeriodReferential.INTERVAL.HOUR,
            },
            {
                value: 4,
                unit: BinancePeriodReferential.INTERVAL.HOUR,
            },
            {
                value: 6,
                unit: BinancePeriodReferential.INTERVAL.HOUR,
            },
            {
                value: 8,
                unit: BinancePeriodReferential.INTERVAL.HOUR,
            },
            {
                value: 12,
                unit: BinancePeriodReferential.INTERVAL.HOUR,
            },
            {
                value: 1,
                unit: BinancePeriodReferential.INTERVAL.DAY,
            },
            {
                value: 3,
                unit: BinancePeriodReferential.INTERVAL.DAY,
            },
            {
                value: 1,
                unit: BinancePeriodReferential.INTERVAL.WEEK,
            },
            {
                value: 1,
                unit: BinancePeriodReferential.INTERVAL.MONTH,
            },
        ];
    }

}

module.exports = {
    BinancePeriodReferential,
};
