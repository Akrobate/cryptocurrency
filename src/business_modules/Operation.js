'use strict';

class Operation {

    // eslint-disable-next-line require-jsdoc
    constructor({
        buy_currency,
        buy_value,
        pay_currency,
        pay_value,
        date,
    }) {
        this.buy_currency = buy_currency;
        this.buy_value = this.formatPriceValue(buy_value);
        this.pay_currency = pay_currency;
        this.pay_value = this.formatPriceValue(pay_value);
        this.pair_name = this.getPairName();
        this.pair_price = this.getPairPrice();
        this.date = new Date(date);
    }

    /**
     * @returns {String}
     */
    getPairName() {
        return `${this.buy_currency}${this.pay_currency}`;
    }

    /**
     * @returns {Number}
     */
    getPairPrice() {
        return this.buy_value / this.pay_value;
    }

    /**
     * @param {String|Number} value
     * @returns {Number}
     */
    formatPriceValue(value) {
        let response = value;
        if (typeof response === 'string') {
            response = response.replace(',', '.');
        }
        return Number(response);
    }

}


module.exports = {
    Operation,
};
