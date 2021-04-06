'use strict';

const {
    CryptoCompare,
} = require('./libs/CryptoCompare');

const crypto_compare = new CryptoCompare();

crypto_compare
    .getPrice('ETH', 'BTC,USD,EUR')
    .then((data) => {
        console.log(data);
    });

const {
    Agent,
} = require('./business_modules/Agent');
const {
    Market,
} = require('./business_modules/Market');


const market = new Market();


market.setStartDate('2015-01-01');
market.setEndDate('2016-12-31');

market.loadData(() => {

    const agent = new Agent(10.0);

    const current_price = market.getCurrentPrice();
    agent.setCurrentPrice(current_price);
    console.log(agent);

    const currency = 'BTC';
    const paidWithCurrency = 'EUR';
    const payment = 5.0;

    agent.buy(currency, paidWithCurrency, payment);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(agent);

    console.log('Operations logs');
    console.log(agent.operations.data);

    agent.buy(currency, paidWithCurrency, payment);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(agent);

    console.log('Operations logs');
    console.log(agent.operations.data);

    agent.sell(currency, paidWithCurrency, 0.007871012686722265);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(agent);

    console.log('Operations logs');
    console.log(agent.operations.data);

    agent.sell(currency, paidWithCurrency, 0.03);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(agent);

    console.log('Operations logs');
    console.log(agent.operations.data);

    // current_price = market.getNextPrice();
    // agent.setCurrentPrice(current_price);
    // console.log(agent);
    //
    // current_price = market.getNextPrice();
    // agent.setCurrentPrice(current_price);
    // console.log(agent);

});
