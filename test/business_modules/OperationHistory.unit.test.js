'use strict';

const {
    expect,
} = require('chai');

const {
    OperationsHistory,
} = require('../../src/business_modules');

describe('OperationsHistory', () => {

    const seed_csv_file = './test/data/operation_history_seed.csv';

    it('Should be able to read csv operation file', () => {
        const operations_history = new OperationsHistory();
        return operations_history.loadCsvOperations(seed_csv_file)
            .then(() => {
                const [
                    operation_1,
                    operation_2,
                    operation_3,
                ] = operations_history.getOperationList();
                expect(operation_1.buy_currency).to.equal('CURB');
                expect(operation_2.buy_currency).to.equal('CURA');
                expect(operation_3.buy_currency).to.equal('CURD');
            });
    });

});
