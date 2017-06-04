'use strict'

// Récupération du client mongodb
var bodyParser = require('body-parser');
var CryptoCompare = require('./libs/CryptoCompare');
var MinerGate = require('./libs/MinerGate');
var orm = require('./libs/orm');

let Agent = require('./business_modules/Agent');
let Market = require('./business_modules/Market');
var sleep = require('sleep');

let market = new Market();


market.setStartDate("2014-09-01");
market.setEndDate("2017-05-21");

market.loadData( function(data) {

    let agent = new Agent(10.0);
    agent.setMarket(market);

    let current_price = market.getCurrentPrice();
    agent.setCurrentPrice(current_price);
    //console.log(agent);

    let currency = 'BTC';
    let paidWithCurrency = 'EUR';
    let payment = 5.0;

console.log(market.getPricesCount());
    for (let i = 0; i < market.getPricesCount() - 1; i++) {
        // market.getPricesCount() - 1
        current_price = market.getNextPrice();
        //console.log(current_price);
        agent.setCurrentPrice(current_price);
        agent.trade();
    }


});
