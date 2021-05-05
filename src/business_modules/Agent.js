'use strict';

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
        this.wallets_euro_balance = {};
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

        const to_currency_index = cryptocurrencies.indexOf(to_currency);
        if (to_currency_index > -1) {
            cryptocurrencies.splice(to_currency_index, 1);
        }

        for (const cryptocurrency of cryptocurrencies) {
            await this.wallets[cryptocurrency].updateBalanceEuro();
        }

        const balance = cryptocurrencies.reduce((accumulator, currency) => {
            const curency_price = this.wallets[currency].getBalanceEuro();
            return accumulator + curency_price;
        }, 0);

        return balance;
    }


    /**
     * @returns {Array<Object>}
     */
    getWalletsWithAmount() {
        return Object.keys(this.wallets)
            .map((key) => this.wallets[key])
            .filter((wallet) => wallet.getBalance() !== 0);
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
