'use strict';

const {
    TraderAgent,
} = require('./business_modules');
const Market = require('./business_modules/Market');

const market = new Market();

market.setStartDate('2014-09-01');
market.setEndDate('2017-05-21');

market.loadData(() => {
    const trader_agent = new TraderAgent(10.0);
    trader_agent.setMarket(market);

    let current_price = market.getCurrentPrice();
    trader_agent.setCurrentPrice(current_price);

    for (let iterator = 0; iterator < market.getPricesCount() - iterator; iterator++) {
        current_price = market.getNextPrice();
        trader_agent.setCurrentPrice(current_price);
        trader_agent.trade();
    }
});
