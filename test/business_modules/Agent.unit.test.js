'use strict';

const {
    expect,
} = require('chai');

const {
    Agent,
} = require('../../src/business_modules');

describe.only('Agent unit test', () => {

    const seed_csv_file = './test/data/real_operation_history_seed.csv';

    it('Should be able to init Agent object', () => {
        const agent = new Agent('Smith');
        expect(agent).to.have.property('name', 'Smith');
    });

    it.only('Should be able to generate wallets from history file', (done) => {
        const agent = new Agent('Smith');
        agent.loadOperationFile(seed_csv_file)
            .then(() => {
                agent.generateWalletsState();
                // expectation here
                done();
            });
    });
});
