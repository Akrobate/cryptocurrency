'use strict'

var orm = require('../libs/orm');

/**
 *
 */

class Market {

    constructor() {
        this.start_date = "";
        this.end_date = "";
        this.data = [];
        this.current = 0;
    }


    getPricesCount() {
        return this.data.length;
    }

    getNextPrice() {
        this.current++;
        return this.getCurrentPrice();
    }


    getCurrentPrice() {
        return this.data[this.current];
    }

    getCurrentEvolution(currency) {
        return (this.data[this.current][currency] - this.data[this.current - 1][currency]) / this.data[this.current][currency] * 100;
    }


    getCurrentPointer() {
        return this.current;
    }

    setStartDate(date) {
        this.start_date = date;
    }


    setEndDate(date) {
        this.end_date = date;
    }

    loadData(callback) {

        const collection_name = 'historical_prices';

        let options = {
            "limit": 10000,
            "sort":  { date: 1 }
        };

        let find = {
            date: {
                $lte: new Date(this.end_date),
                $gte: new Date(this.start_date)
            }
        };

        orm.find(collection_name, find, options, (data) => {
            this.data = data;
            callback(data);
        });
    }

}


module.exports = Market;
