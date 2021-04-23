'use strict';

const {
    OperationsHistory,
} = require('../../src/business_modules');

describe.only('OperationsHistory', () => {

    const seed_csv_file = './test/data/operation_history_seed.csv';

    it('Should be able to read csv operation file', () => {
        const operations_history = new OperationsHistory();
        operations_history.loadCsvOperations(seed_csv_file)
            .then(() => {
                console.log(operations_history.data);
            })
            .catch((error) => console.log(error));
    });

});
