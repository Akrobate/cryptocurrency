'use strict';

const {
    CryptoCompare,
} = require('./repositories/api');

const {
    TraderAgent,
    Market,
} = require('./business_modules');

const crypto_compare = new CryptoCompare();

crypto_compare
    .getPrice('ETH', 'BTC,USD,EUR')
    .then((data) => {
        console.log(data);
    });

const market = new Market();


market.setStartDate('2015-01-01');
market.setEndDate('2016-12-31');

market.loadData(() => {

    const trader_agent = new TraderAgent(10.0);

    const current_price = market.getCurrentPrice();
    trader_agent.setCurrentPrice(current_price);

    const currency = 'BTC';
    const paidWithCurrency = 'EUR';
    const payment = 5.0;

    trader_agent.buy(currency, paidWithCurrency, payment);

    console.log('Operations logs');
    console.log(trader_agent.operations.data);

    trader_agent.buy(currency, paidWithCurrency, payment);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(trader_agent);

    console.log('Operations logs');
    console.log(trader_agent.operations.data);

    trader_agent.sell(currency, paidWithCurrency, 0.007871012686722265);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(trader_agent);

    console.log('Operations logs');
    console.log(trader_agent.operations.data);

    trader_agent.sell(currency, paidWithCurrency, 0.03);

    console.log('AFTER BUY+++++++++++++++++++++++');
    console.log(trader_agent);

    console.log('Operations logs');
    console.log(trader_agent.operations.data);

    // current_price = market.getNextPrice();
    // trader_agent.setCurrentPrice(current_price);
    // console.log(trader_agent);
    //
    // current_price = market.getNextPrice();
    // trader_agent.setCurrentPrice(current_price);
    // console.log(trader_agent);

});
