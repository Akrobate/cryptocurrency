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
        // this.target_historical_count = 60 * 24 * 7;
        this.target_historical_count = 120;
        this.historical_data = [];

        this.current_average = null;
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
            this.updateCurrentAverage();
        }

        if (this.current_average !== null) {
            // console.log('av:', this.current_average.toFixed(4), ' close:', this.trading_market.close.toFixed(4));
            
            // console.log(((this.current_average - this.trading_market.close));


            if (this.trading_market.close < (this.current_average)) {
                console.log('should by');
                console.log('av:', this.current_average.toFixed(4), ' close:', this.trading_market.close.toFixed(4));
            
                /*
                console.log('av:', this.current_average.toFixed(4), ' close:', this.trading_market.close.toFixed(4));
                console.log("Orderiiiinngggggggggg")
                this.trading_market.addOrder(
                    this.trading_market.close * 0.01,
                    10,
                    'buy',
                    (data) => {
                        console.log('=========order==========');
                        console.log(data);
                        console.log('=========/order==========');
                    }
                );
                */
            }
        }

        // console.log(this.historical_data.length);
        // console.log(this.historical_data.map(item => item.open));
    }


    /**
     * @param {Object} data
     * @return {void}
     */
    processFilledOrder(data) {

    }

    /**
     * @return {void}
     */
    updateCurrentAverage() {
        // console.log(this.historical_data);
        this.current_average = this.historical_data
            .reduce((accumulator, item) => accumulator + item.close, 0)
                / this.target_historical_count;
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
