'use strict';

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
    setObserver(observer) {
        this.observers.push(observer);
    }


    /**
     * @returns {void}
     */
    processInterval() {
        this.data_index++;

        // @todo: remove magic numbers
        this.open_time = Number(this.data[this.data_index][0]);
        this.open = Number(this.data[this.data_index][1]);
        this.high = Number(this.data[this.data_index][2]);
        this.low = Number(this.data[this.data_index][3]);
        this.close = Number(this.data[this.data_index][4]);

        this.processOrders();
    }


    /**
     * @returns {void}
     */
    processOrders() {

    }

    /**
     * @returns {Number}
     */
    getOpenPrice() {
        return this.data[this.data_index][1];
    }

    // eslint-disable-next-line require-jsdoc
    setData(data) {
        this.data = data;
    }

}


module.exports = {
    VirtualMarket,
};
