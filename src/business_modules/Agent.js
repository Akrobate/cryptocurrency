'use strict';

const Promise = require('bluebird');
const {
    OperationsHistory,
} = require('./OperationsHistory');

const {
    Wallet,
} = require('./Wallet');

const {
    Binance,
} = require('../repositories/api/Binance');

class Agent {

    /**
     * @static
     * @returns {Agent}
     */
    static buildAgent() {
        return new Agent(
            new OperationsHistory(),
            Binance.getInstance()
        );
    }


    // eslint-disable-next-line require-jsdoc
    constructor(operations_history, binance_repository) {
        this.operations_history = operations_history;
        this.binance_repository = binance_repository;
        this.wallets = {};
    }


    /**
     * @param {String} file
     * @returns {Params}
     */
    loadOperationFile(file) {
        return this.operations_history.loadCsvOperations(file);
    }


    /**
     * @param {OperationsHistory} operations_history
     * @returns {Object}
     */
    generateWalletsState() {
        const operation_list = this
            .operations_history.getOperationList();

        operation_list.forEach((operation) => {
            this.getWalletInstance(operation.getBuyCurrency()).deposit(operation.getBuyValue());
            this.getWalletInstance(operation.getPayCurrency()).withdraw(operation.getPayValue());
        });
    }


    /**
     * @param {String} wallet_currency
     * @return {Wallet}
     */
    getWalletInstance(wallet_currency) {
        if (!this.wallets[wallet_currency]) {
            this.wallets[wallet_currency] = Wallet.buildWallet(wallet_currency);
        }
        return this.wallets[wallet_currency];
    }


    /**
     * @returns {Object}
     */
    getWallets() {
        return this.wallets;
    }


    /**
     * @param {String} to_currency
     * @return {Number}
     */
    async calculateAgentBalance(to_currency) {

        const cryptocurrencies = Object.keys(this.wallets);
        // console.log(cryptocurrencies);

        const to_currency_index = cryptocurrencies.indexOf(to_currency);
        if (to_currency_index > -1) {
            cryptocurrencies.splice(to_currency_index, 1);
        }
        // console.log(cryptocurrencies);

        const prices = {};

        await Promise.mapSeries(
            cryptocurrencies,
            async (cryptocurrency) => {
                const result = await this.binance_repository
                    .getLatestPrice(`${cryptocurrency}${to_currency}`);
                prices[cryptocurrency] = Number(result.price);
            }
        );

        const balance = cryptocurrencies.reduce((accumulator, currency) => {
            const curency_price = prices[currency] * this.wallets[currency].getBalance();
            return accumulator + curency_price;
        }, 0);

        return balance;
    }


    /**
     * @param {String} currency
     * @return {Number}
     */
    getBalanceFromWallet(currency) {
        return this.wallets[currency].getBalance();
    }

}

module.exports = {
    Agent,
};
