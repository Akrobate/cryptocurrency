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

    it('Should be able to generate wallets from history file', async () => {
        const agent = new Agent('Smith');
        await agent.loadOperationFile(seed_csv_file);
        agent.generateWalletsState();
        const wallets = agent.getWallets();
        expect(wallets).to.have.property('ADA');
        expect(wallets).to.have.property('EUR');
        expect(wallets).to.have.property('DOT');

    });
});
