'use strict'

const OperationsHistory = require('./OperationsHistory');

/**
 *
 */

class Agent {


    constructor(eur) {
        this.wallets = {
            'EUR': eur,
            'BTC': 0
        }
        this.current_price = null;
        this.min_prices = {};
        this.max_prices = {};

        this.low_trigger_percentage = 0.00001;
        this.hight_trigger_percentage = 0.00001;

        this.operations = new OperationsHistory();
    }

    setMarket(market) {
        this.market = market;
    }


    checkLowerTrigger(currency) {
        return ((this.calculateVariationsSinceLastOperation(currency) * -1) > this.low_trigger_percentage);
    }


    checkHighTrigger(currency) {
        //console.log(this.operations);
        return (this.calculateVariationsSinceLastOperation(currency) > this.hight_trigger_percentage);
    }


    calculateVariationsSinceLastOperation(currency) {
        // console.log(currency);
        let last_operation_price = this.operations.getLast().price;
        // console.log(last_operation_price);
        // console.log((this.current_price[currency]));
        let variation_pourcentage = (this.current_price[currency] - last_operation_price[currency]) / last_operation_price[currency] * 100;
        // console.log(variation_pourcentage);
        return variation_pourcentage;
    }


    setCurrentPrice(current_price) {
        this.current_price = current_price;
        let currencies = ['EUR', 'USD'];
        for(let i of currencies) {
            if (!this.min_prices.hasOwnProperty(i)) {
                this.min_prices[i] = current_price[i]
            } else {
                if (this.min_prices[i] > current_price[i]) {
                    this.min_prices[i] = current_price[i]
                }
            }
            if (!this.max_prices.hasOwnProperty(i)) {
                this.max_prices[i] = current_price[i]
            } else {
                if (this.max_prices[i] < current_price[i]) {
                    this.max_prices[i] = current_price[i]
                }
            }
        }
    }


    buy(currency, paidWithCurrency, payment) {
        let currency_value = payment / this.current_price[paidWithCurrency];
        this.wallets[paidWithCurrency] -= payment;
        this.wallets[currency] += currency_value;

        this.operations.add({
            type: 'buy',
            currency: currency,
            paid_with: paidWithCurrency,
            currency_value: currency_value,
            payment_value: payment,
            price: this.current_price
        });
    }



    sell(currency, paidWithCurrency, currency_value) {
        let payment_value = currency_value * this.current_price[paidWithCurrency];
        this.wallets[paidWithCurrency] += payment_value;
        this.wallets[currency] -= currency_value;

        this.operations.add({
            type: 'sell',
            currency: currency,
            paid_with: paidWithCurrency,
            currency_value: currency_value,
            payment_value: payment_value,
            price: this.current_price
        });
    }




    trade() {

        let percentage_bet = 80;
        let currency = 'BTC';
        let paid_with = 'EUR';

        let waiting_for_action = '';

        // If nothing was bought buy BTC
        if(this.operations.empty()) {
            this.buy(currency, paid_with, this.wallets[paid_with] / 100 * percentage_bet);
        } else {

            if (this.operations.getLast().type == 'buy') {
                waiting_for_action = 'sell';
                    if (this.checkHighTrigger(paid_with)) {
                        if (this.market.getCurrentEvolution(paid_with) < 0) {
                        console.log("Selling......................... +++++++++++++++++++++++++");
                        console.log(this.calculateVariationsSinceLastOperation(paid_with));
                        this.sell(currency, paid_with, this.wallets[currency]);
                        console.log(this.wallets)
                    } else {
                        console.log("Gonna to sell but waiting...")
                        console.log(this.calculateVariationsSinceLastOperation(paid_with));
                    }
                }
            } else {
                waiting_for_action = 'buy';
                if (this.checkLowerTrigger(paid_with)) {
                    if (this.market.getCurrentEvolution(paid_with) > 0) {
                        console.log("Buing......................... -----------------------------");
                        console.log(this.calculateVariationsSinceLastOperation(paid_with));
                        this.buy(currency, paid_with, this.wallets[paid_with] / 100 * percentage_bet);
                        console.log(this.wallets)
                    } else {
                        console.log("Gonna to buy but waiting...")
                        console.log(this.calculateVariationsSinceLastOperation(paid_with));
                    }
                }
            }

        }


        // console.log("Waiting to " + waiting_for_action + " variation " + this.calculateVariationsSinceLastOperation(paid_with));


    }



}


module.exports = Agent;
