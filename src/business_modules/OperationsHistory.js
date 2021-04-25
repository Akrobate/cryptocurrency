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
        this.operation_list = [];
        this.current_pointer = -1;
    }

    // eslint-disable-next-line require-jsdoc
    add(operation) {
        this.operation_list.push(operation);
        this.current_pointer++;
    }

    /**
     * @return {Number}
     */
    getLast() {
        return this.operation_list[this.current_pointer];
    }

    /**
     * @return {Boolean}
     */
    empty() {
        return this.operation_list.lenght === 0;
    }

    /**
     * @returns {Array}
     */
    getOperationList() {
        return this.operation_list;
    }

    /**
     *
     * @param {*} file
     * @param {*} status_code_filter
     * @return {Primse}
     */
    loadCsvOperations(file) {
        return this.csv_file
            .readLinePerLineCsvFile(file,
                (data) => this.add(new Operation(data))
            );
    }
}


module.exports = {
    OperationsHistory,
};
