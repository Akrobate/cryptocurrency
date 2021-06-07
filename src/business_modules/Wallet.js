'use strict';

const {
    Binance,
} = require('../repositories/api/Binance');

class Wallet {

    // eslint-disable-next-line require-jsdoc
    constructor(currency) {
        this.currency = currency;
        this.balance = null;
        // this.balance_euro = 0;
        this.price_euro = null;
        this.price_usdt = null;
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
        return this.price_euro * this.getBalance();
    }

    /**
     * @returns {Number}
     */
    getBalanceUsdt() {
        return this.price_usdt * this.getBalance();
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
    async updatePrices() {
        if (this.currency !== 'EUR') {
            const result_euro = await this.binance_repository
                .adaptSymbolAndGetLastestPrice(`${this.currency}EUR`)
                .catch(() => ({
                    price: null,
                }));
            this.price_euro = Number(result_euro.price);
        }

        if (this.currency !== 'USDT') {
            const result_usdt = await this.binance_repository
                .adaptSymbolAndGetLastestPrice(`${this.currency}USDT`)
                .catch(() => ({
                    price: 0,
                }));
            this.price_usdt = Number(result_usdt.price);
        }

        if (this.price_euro === 0) {
            const result_usdt_euro = await this.binance_repository
                .adaptSymbolAndGetLastestPrice('USDTEUR');
            this.price_euro = Number(result_usdt_euro.price) * this.price_usdt;
        }
    }


}

module.exports = {
    Wallet,
};
