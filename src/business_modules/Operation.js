'use strict';

class Operation {

    // eslint-disable-next-line require-jsdoc
    constructor({
        buy_currency,
        buy_value,
        buy_fees,
        pay_currency,
        pay_value,
        pay_fees,
        date,
    }) {
        this.buy_currency = buy_currency;
        this.buy_value = this.formatPriceValue(buy_value);
        this.pay_currency = pay_currency;
        this.pay_value = this.formatPriceValue(pay_value);
        this.pair_name = this.getPairName();
        this.pair_price = this.getPairPrice();
        this.date = new Date(date);
        this.pay_fees = this.formatPriceValue(pay_fees);
        this.buy_fees = this.formatPriceValue(buy_fees);
    }

    /**
     * @returns {String}
     */
    getPairName() {
        return `${this.buy_currency}${this.pay_currency}`;
    }


    /**
     * @returns {String}
     */
    getBuyCurrency() {
        return this.buy_currency;
    }

    /**
     * @returns {String}
     */
    getPayCurrency() {
        return this.pay_currency;
    }

    /**
     * @returns {String}
     */
    getBuyValue() {
        return this.buy_value;
    }

    /**
     * @returns {String}
     */
    getPayValue() {
        return this.pay_value;
    }

    /**
     * @returns {Number}
     */
    getPairPrice() {
        return this.pay_value / this.buy_value;
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
