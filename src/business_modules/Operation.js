'use strict';

class Operation {

    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.type = null;
        this.currency = null;
        this.paid_with = null;
        this.currency_value = null;
        this.payment_value = null;
        this.price = null;
    }

    /**
     * @return {String}
     */
    static get SELL_TYPE() {
        return 'sell';
    }

    /**
     * @return {String}
     */
    static get BUY_TYPE() {
        return 'buy';
    }

    /**
     * @returns {void}
     */
    setTypeSell() {
        this.type = Operation.SELL_TYPE;
    }


    /**
     * @returns {void}
     */
    setTypeBuy() {
        this.type = Operation.BUY_TYPE;
    }

}


module.exports = {
    Operation,
};
