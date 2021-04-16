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
