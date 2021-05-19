'use strict';

const moment = require('moment');
class VirtualMarket {

    /**
     * @returns {VirtualMarket}
     */
    static build() {
        return new VirtualMarket();
    }

    // eslint-disable-next-line require-jsdoc
    constructor(symbol, interval_value, interval_unit) {

        this.symbol = symbol;
        this.interval_unit = interval_unit;
        this.interval_value = interval_value;

        this.status = null; // running / stopped

        this.tick_real_duration = 0;

        this.data = [];
        this.data_index = 0;

        this.open_time = null;
        this.open = null;
        this.high = null;
        this.low = null;
        this.close = null;

        this.orders = [];

        this.observers = [];
    }


    /**
     * @param {Object} observer
     * @returns {void}
     */
    addObserver(observer) {
        this.observers.push(observer);
    }

    /**
     * @returns {Void}
     */
    async start() {
        this.status = 'running';
        while (this.status === 'running') {
            await this.processInterval();
            await this.sleepAsync(this.tick_real_duration);
        }
    }

    /**
     * @returns {Void}
     */
    stop() {
        this.status = 'stopped';
    }

    /**
     * @returns {void}
     */
    async processInterval() {
        this.data_index++;

        // @todo: remove magic numbers
        this.open_time = Number(this.data[this.data_index][0]);
        this.open = Number(this.data[this.data_index][1]);
        this.high = Number(this.data[this.data_index][2]);
        this.low = Number(this.data[this.data_index][3]);
        this.close = Number(this.data[this.data_index][4]);

        await this.processOrders();

        for (let index = 0; index < this.observers.length; index++) {
            await this.observers[index].update();
        }
    }


    /**
     * @returns {void}
     */
    async processOrders() {

        const processed_orders_index = [];
        for (let index = 0; index < this.orders.length; index++) {

            const {
                price,
                volume,
                side,
                callback: processed_order_function,
            } = this.orders[index];

            // buy
            if (side === 'buy' && this.low <= price) {
                await processed_order_function({
                    price,
                    volume,
                    side,
                    status: 'filled',
                });
                await processed_orders_index.push(index);
            }

            // sell
            if (side === 'sell' && this.high >= price) {
                await processed_order_function({
                    price,
                    volume,
                    side,
                    status: 'filled',
                });
                processed_orders_index.push(index);
            }

        }

        // console.log(processed_orders_index);

        // remove executed orders
        processed_orders_index
            .sort((index_1, index_2) => index_2 - index_1)
            .forEach((to_remove) => this.orders.splice(to_remove, 1));

    }

    /**
     * @param {*} price
     * @param {*} volume
     * @param {*} side
     * @param {*} callback
     * @returns {Void}
     */
    addOrder(price, volume, side, callback) {
        this.orders.push({
            price,
            volume,
            side,
            callback,
        });
    }

    /**
     * @returns {Number}
     */
    getOpenPrice() {
        return this.open_time;
    }

    // eslint-disable-next-line require-jsdoc
    setData(data) {
        this.data = data;
    }


    // eslint-disable-next-line require-jsdoc
    displayTickData() {
        const row = {
            time: this.timeToDate(this.open_time),
            open_time: this.open_time,
            open: this.open,
            high: this.high,
            low: this.low,
            close: this.close,
        };
        console.log(row);
    }


    // eslint-disable-next-line require-jsdoc
    timeToDate(time) {
        return moment.unix(Number(time) / 1000).format('MM/DD/YYYY hh:mm:ss');
    }


    /**
     * @param {Number} duration
     * @returns {Void}
     */
    async sleepAsync(duration) {
        await new Promise((resolve) => setTimeout(resolve, duration));
        return null;
    }

}


module.exports = {
    VirtualMarket,
};
