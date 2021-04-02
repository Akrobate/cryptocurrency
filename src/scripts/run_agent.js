'use strict';

const Agent = require('./business_modules/Agent');
const Market = require('./business_modules/Market');

const market = new Market();

market.setStartDate('2014-09-01');
market.setEndDate('2017-05-21');

market.loadData(() => {
    const agent = new Agent(10.0);
    agent.setMarket(market);

    let current_price = market.getCurrentPrice();
    agent.setCurrentPrice(current_price);

    for (let iterator = 0; iterator < market.getPricesCount() - iterator; iterator++) {
        current_price = market.getNextPrice();
        agent.setCurrentPrice(current_price);
        agent.trade();
    }
});
