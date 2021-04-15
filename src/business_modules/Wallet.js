'use strict';

class Wallet {

    // eslint-disable-next-line require-jsdoc
    constructor(currency) {
        this.currency = currency;
        this.balance = null;
        this.history = [];
    }

    // eslint-disable-next-line require-jsdoc
    static buildWallet(currency, balance, history) {
        const wallet = new Wallet(currency);
        wallet.setBalance(balance);
        wallet.setHistory(history);
        return wallet;
    }

    /**
     * @param {Number} balance
     * @returns {void}
     */
    setBalance(balance) {
        this.balance = balance;
    }

    /**
     * @param {Array} history
     * @returns {void}
     */
    setHisotry(history) {
        this.history = history;
    }

}

module.exports = {
    Wallet,
};
