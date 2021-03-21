'use strict';

const OperationsHistory = require('./OperationsHistory');


class Agent {


    // eslint-disable-next-line require-jsdoc
    constructor(eur) {
        this.wallets = {
            BTC: 0,
            EUR: eur,
        };
        this.current_price = null;
        this.min_prices = {};
        this.max_prices = {};

        this.low_trigger_percentage = 0.00001;
        this.hight_trigger_percentage = 0.00001;

        this.operations = new OperationsHistory();
    }

    // eslint-disable-next-line require-jsdoc
    setMarket(market) {
        this.market = market;
    }

    // eslint-disable-next-line require-jsdoc
    checkLowerTrigger(currency) {
        return (this.calculateVariationsSinceLastOperation(currency) * -1)
            > this.low_trigger_percentage;
    }

    // eslint-disable-next-line require-jsdoc
    checkHighTrigger(currency) {
        return (this.calculateVariationsSinceLastOperation(currency)
            > this.hight_trigger_percentage);
    }

    // eslint-disable-next-line require-jsdoc
    calculateVariationsSinceLastOperation(currency) {
        const last_operation_price = this.operations.getLast().price;
        const variation_pourcentage = (
            this.current_price[currency] - last_operation_price[currency]
        ) / last_operation_price[currency] * 100;
        return variation_pourcentage;
    }


    // eslint-disable-next-line require-jsdoc
    setCurrentPrice(current_price) {
        this.current_price = current_price;
        const currencies = ['EUR', 'USD'];
        for (const index of currencies) {

            if (Object.prototype.hasOwnProperty.call(this.min_prices, index)) {
                if (this.min_prices[index] > current_price[index]) {
                    this.min_prices[index] = current_price[index];
                }
            } else {
                this.min_prices[index] = current_price[index];
            }

            if (Object.prototype.hasOwnProperty.call(this.max_prices, index)) {
                if (this.max_prices[index] < current_price[index]) {
                    this.max_prices[index] = current_price[index];
                }
            } else {
                this.max_prices[index] = current_price[index];
            }
        }
    }

    // eslint-disable-next-line require-jsdoc
    buy(currency, paidWithCurrency, payment) {
        const currency_value = payment / this.current_price[paidWithCurrency];
        this.wallets[paidWithCurrency] -= payment;
        this.wallets[currency] += currency_value;

        this.operations.add({
            type: 'buy',
            currency,
            paid_with: paidWithCurrency,
            currency_value,
            payment_value: payment,
            price: this.current_price,
        });
    }


    // eslint-disable-next-line require-jsdoc
    sell(currency, paidWithCurrency, currency_value) {
        const payment_value = currency_value * this.current_price[paidWithCurrency];
        this.wallets[paidWithCurrency] += payment_value;
        this.wallets[currency] -= currency_value;

        this.operations.add({
            type: 'sell',
            currency,
            paid_with: paidWithCurrency,
            currency_value,
            payment_value,
            price: this.current_price,
        });
    }

    // eslint-disable-next-line require-jsdoc
    trade() {

        const percentage_bet = 80;
        const currency = 'BTC';
        const paid_with = 'EUR';

        let waiting_for_action = '';

        // If nothing was bought buy BTC
        if (this.operations.empty()) {
            this.buy(currency, paid_with, this.wallets[paid_with] / 100 * percentage_bet);
        } else if (this.operations.getLast().type === 'buy') {
            waiting_for_action = 'sell';
            if (this.checkHighTrigger(paid_with)) {
                if (this.market.getCurrentEvolution(paid_with) < 0) {
                    console.log('Selling......................... +++++++++++++++++++++++++');
                    console.log(this.calculateVariationsSinceLastOperation(paid_with));
                    this.sell(currency, paid_with, this.wallets[currency]);
                    console.log(this.wallets);
                } else {
                    console.log('Gonna to sell but waiting...');
                    console.log(this.calculateVariationsSinceLastOperation(paid_with));
                }
            }
        } else {
            waiting_for_action = 'buy';
            if (this.checkLowerTrigger(paid_with)) {
                if (this.market.getCurrentEvolution(paid_with) > 0) {
                    console.log('Buing......................... -----------------------------');
                    console.log(this.calculateVariationsSinceLastOperation(paid_with));
                    this.buy(currency, paid_with, this.wallets[paid_with] / 100 * percentage_bet);
                    console.log(this.wallets);
                } else {
                    console.log('Gonna to buy but waiting...');
                    console.log(this.calculateVariationsSinceLastOperation(paid_with));
                }
            }
        }
        console.log(`Waiting to ${waiting_for_action} ${this.calculateVariationsSinceLastOperation(paid_with)}`);
    }
}


module.exports = Agent;
