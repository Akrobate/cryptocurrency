'use strict';

class BinancePeriodReferential {

    /**
     * @param {*} interval_value
     * @param {*} interval_unit
     * @return {Number}
     */
    static getSecondMillisDuration(interval_value, interval_unit) {

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
     * All available periods
     * @return {Array}
     */
    static get AVAILABLE_PERIODS() {
        return [
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
    }

}

module.exports = {
    BinancePeriodReferential,
};
