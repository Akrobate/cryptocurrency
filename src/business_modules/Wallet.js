'use strict';

class Wallet {

    // eslint-disable-next-line require-jsdoc
    constructor(currency) {
        this.currency = currency;
        this.balance = null;
        this.history = [];
    }


    /**
     * @static
     * @param {String} currency
     * @param {Number} balance
     * @param {Array} history
     * @returns {Wallet}
     */
    static buildWallet(currency, balance = 0, history = null) {
        const wallet = new Wallet(currency);
        wallet.setBalance(balance);
        if (history) {
            wallet.setHistory(history);
        }
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
     * @returns {Number}
     */
    getBalance() {
        return this.balance;
    }

    /**
     * @param {Array} history
     * @returns {void}
     */
    setHisotry(history) {
        this.history = history;
    }

    /**
     * @param {Number} amount
     * @returns {void}
     */
    withdraw(amount) {
        this.addHistory(-amount);
        this.balance -= amount;
    }

    /**
     * @param {Number} amount
     * @returns {void}
     */
    deposit(amount) {
        this.addHistory(amount);
        this.balance += amount;
    }


    /**
     * @param {Number} amount
     * @returns {void}
     */
    addHistory(amount) {
        this.history.push({
            date: new Date(),
            amount,
        });
    }

}

module.exports = {
    Wallet,
};
