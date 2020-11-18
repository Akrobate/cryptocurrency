'use strict'

let Agent = require('./business_modules/Agent');
let Market = require('./business_modules/Market');

let market = new Market();

market.setStartDate("2014-09-01");
market.setEndDate("2017-05-21");

market.loadData((data) => {
    const agent = new Agent(10.0);
    agent.setMarket(market);

    let current_price = market.getCurrentPrice();
    agent.setCurrentPrice(current_price);

    for (let i = 0; i < market.getPricesCount() - 1; i++) {
        current_price = market.getNextPrice();
        agent.setCurrentPrice(current_price);
        agent.trade();
    }
});
