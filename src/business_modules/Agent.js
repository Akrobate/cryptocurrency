'use strict';

const {
    OperationsHistory,
} = require('./OperationsHistory');

const {
    Wallet,
} = require('./Wallet');

class Agent {


    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        this.name = name;
        console.log(`Agent declared: ${this.name}`);

        this.operations_history = new OperationsHistory();
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

}

module.exports = {
    Agent,
};
