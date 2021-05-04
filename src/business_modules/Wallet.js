'use strict';

const {
    Binance,
} = require('../repositories/api/Binance');

class Wallet {

    // eslint-disable-next-line require-jsdoc
    constructor(currency) {
        this.currency = currency;
        this.balance = null;
        this.balance_euro = 0;
        this.price_euro = null;
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
        wallet.injectDependencies(Binance.getInstance());
        wallet.setBalance(balance);
        if (history) {
            wallet.setHistory(history);
        }
        return wallet;
    }


    /**
     * @param {Binance} binance_repository
     * @returns {void}
     */
    injectDependencies(binance_repository) {
        this.binance_repository = binance_repository;
    }

    /**
     * @param {Number} balance
     * @returns {void}
     */
    setBalance(balance) {
        this.balance = balance;
    }


    /**
     * @returns {String}
     */
    getCurrency() {
        return this.currency;
    }


    /**
     * @returns {Number}
     */
    getBalance() {
        return this.balance;
    }


    /**
     * @returns {Number}
     */
    getBalanceEuro() {
        return this.balance_euro;
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


    /**
     * @async
     * @returns {void}
     */
    async updateBalanceEuro() {
        if (this.getBalance() !== 0 && this.currency !== 'EUR') {
            const result = await this.binance_repository
                .adaptSymbolAndGetLastestPrice(`${this.currency}EUR`);
            this.price_euro = Number(result.price);
            this.balance_euro = this.price_euro * this.getBalance();
        }
    }

}

module.exports = {
    Wallet,
};
