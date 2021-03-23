'use strict';

const MongoDbRepository = require('../repositories/MongoDbRepository');

class Market {

    /**
     * @returns {Market}
     */
    static build() {
        return new Market(
            MongoDbRepository.getInstance()
        );
    }

    // eslint-disable-next-line require-jsdoc
    constructor(mongo_db_repository) {
        this.mongo_db_repository = mongo_db_repository
        this.start_date = null;
        this.end_date = null;
        this.data = [];
        this.current = 0;
    }

    /**
     * @returns {Number}
     */
    getPricesCount() {
        return this.data.length;
    }

    /**
     * @returns {Number}
     */
    getNextPrice() {
        this.current++;
        return this.getCurrentPrice();
    }

    /**
     * @returns {Number}
     */
    getCurrentPrice() {
        return this.data[this.current];
    }

    /**
     * @param {String} currency
     * @returns {Number}
     */
    getCurrentEvolution(currency) {
        return (this.data[this.current][currency] - this.data[this.current - 1][currency])
            / this.data[this.current][currency] * 100;
    }

    /**
     * @returns {Number}
     */
    getCurrentPointer() {
        return this.current;
    }

    // eslint-disable-next-line require-jsdoc
    setStartDate(date) {
        this.start_date = date;
    }

    // eslint-disable-next-line require-jsdoc
    setEndDate(date) {
        this.end_date = date;
    }

    // eslint-disable-next-line require-jsdoc
    loadData(callback) {

        const collection_name = 'historical_prices';

        const options = {
            limit: 10000,
            sort: {
                date: 1,
            },
        };

        const query = {
            date: {
                $gte: new Date(this.start_date),
                $lte: new Date(this.end_date),
            },
        };

        this.mongo_db_repository
            .findDocumentList(collection_name, query, options.limit, null, null, options.sort)
            .then((data) => {
                this.data = data;
                return callback(data);

            });
    }

}


module.exports = Market;
