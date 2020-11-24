const CryptoCompare = require('./libs/CryptoCompare');

let crypto_compare = new CryptoCompare();

crypto_compare.getPrice(
    'ETH', 'BTC,USD,EUR',
    (data) => {
        console.log(data)
    }
)


'use strict'

// Récupération du client mongodb
var bodyParser = require('body-parser');
var CryptoCompare = require('./libs/CryptoCompare');
var MinerGate = require('./libs/MinerGate');
var orm = require('./libs/orm');

let Agent = require('./business_modules/Agent');
let Market = require('./business_modules/Market');


let market = new Market();


market.setStartDate("2015-01-01");
market.setEndDate("2016-12-31");

market.loadData( function(data) {

    let agent = new Agent(10.0);

    let current_price = market.getCurrentPrice();
    agent.setCurrentPrice(current_price);
    console.log(agent);

    let currency = 'BTC';
    let paidWithCurrency = 'EUR';
    let payment = 5.0;

    agent.buy(currency, paidWithCurrency, payment);

console.log("AFTER BUY+++++++++++++++++++++++");
console.log(agent);

console.log("Operations logs");
console.log(agent.operations.data);

    agent.buy(currency, paidWithCurrency, payment);

console.log("AFTER BUY+++++++++++++++++++++++");
console.log(agent);

console.log("Operations logs");
console.log(agent.operations.data);

    agent.sell(currency, paidWithCurrency, 0.007871012686722265);

console.log("AFTER BUY+++++++++++++++++++++++");
console.log(agent);

console.log("Operations logs");
console.log(agent.operations.data);

agent.sell(currency, paidWithCurrency, 0.03);

console.log("AFTER BUY+++++++++++++++++++++++");
console.log(agent);

console.log("Operations logs");
console.log(agent.operations.data);

    // current_price = market.getNextPrice();
    // agent.setCurrentPrice(current_price);
    // console.log(agent);
    //
    // current_price = market.getNextPrice();
    // agent.setCurrentPrice(current_price);
    // console.log(agent);

});


//a.trade("===========))))))))))))))))))))))))))))))))))");
//a.test();
