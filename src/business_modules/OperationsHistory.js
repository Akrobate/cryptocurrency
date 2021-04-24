'use strict';

const {
    CsvFile,
} = require('../repositories');

const {
    Operation,
} = require('./Operation');

class OperationsHistory {


    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.csv_file = CsvFile.getInstance();
        this.data = [];
        this.current_pointer = -1;
    }

    // eslint-disable-next-line require-jsdoc
    add(operation) {
        this.data.push(operation);
        this.current_pointer++;
    }

    /**
     * @return {Number}
     */
    getLast() {
        return this.data[this.current_pointer];
    }

    /**
     * @return {Boolean}
     */
    empty() {
        if (this.current_pointer === -1) {
            return true;
        }
        return false;
    }

    /**
     *
     * @param {*} file
     * @param {*} status_code_filter
     * @return {Primse}
     */
    loadCsvOperations(file) {
        return this.csv_file
            .readLinePerLineCsvFile(
                file,
                (data) => {
                    console.log(data);
                    // this.add(data);

                    this.add(new Operation(data));


                }
            );
    }
}


module.exports = {
    OperationsHistory,
};
