'use strict';

const {
    OperationsHistory,
} = require('./OperationsHistory');

const {
    Wallet,
} = require('./Wallet');

class TradingAgent {

    /**
     * @static
     * @returns {TradingAgent}
     */
    static buildTradingAgent() {
        return new TradingAgent(
            new OperationsHistory()
        );
    }


    // eslint-disable-next-line require-jsdoc
    constructor(operations_history) {
        this.operations_history = operations_history;
        this.order_list = [];
        this.wallets = {};

        this.trading_market = null;

        // Algorithmic data
        this.target_historical_count = 60 * 24 * 7;
        this.target_historical_count = 5;
        this.historical_data = [];
    }


    // eslint-disable-next-line require-jsdoc
    setTradingMarket(trading_market) {
        this.trading_market = trading_market;
        this.trading_market.addObserver(this);
    }


    /**
     * Update market call
     * @returns {Void}
     */
    update() {
        // console.log('Day passed ');
        this.makeDecision();
    }

    /**
     * @returns {Void}
     */
    makeDecision() {

        this.historical_data.push({
            open_time: this.trading_market.open_time,
            open: this.trading_market.open,
            high: this.trading_market.high,
            low: this.trading_market.low,
            close: this.trading_market.close,
        });
        if (this.historical_data.length > this.target_historical_count) {
            this.historical_data.shift();
        }
        // console.log(this.historical_data.length);
        // console.log(this.historical_data.map(item => item.open));
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
     * @param {String} currency
     * @return {Number}
     */
    getBalanceFromWallet(currency) {
        return this.wallets[currency].getBalance();
    }


    /**
     * @returns {Array}
     */
    getOpenOrders() {
        return this.order_list;
    }

}

module.exports = {
    TradingAgent,
};
