'use strict'

// Récupération du client mongodb
const Market = require('./business_modules/Market');
const json2csv = require('json2csv');
const fs = require('fs');

let market = new Market();

market.setStartDate("2014-09-01");
market.setEndDate("2017-05-21");

market.loadData((data) => {

    let data_formated = [];

    let current_price = market.getCurrentPrice();
    data_formated.push(current_price);
    console.log(current_price);
    console.log(market.getPricesCount());
    for (let i = 0; i < market.getPricesCount() - 1; i++) {
        current_price = market.getNextPrice();
        data_formated.push(current_price);
        console.log(current_price);
    }

    var fields = ['date', 'EUR', 'USD'];

    try {
        let result = json2csv({ data: data_formated, fields: fields });
        console.log(result);
        fs.writeFile('market_data.csv', result, function (err) {
            if (err)
                return console.log(err);
            console.log('File written');
        });
    } catch (error) {
        // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        // Be sure to provide fields if it is possible that your data array will be empty.
        console.error(error);
    }
});
