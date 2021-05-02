'use strict';

const {
    expect,
} = require('chai');

const {
    mock,
} = require('sinon');

const {
    Agent,
} = require('../../src/business_modules');

const {
    Binance,
} = require('../../src/repositories/api/Binance');

describe('Agent unit test', () => {

    const seed_csv_file = './test/data/real_operation_history_seed.csv';

    const mocks = {};

    beforeEach(() => {
        mocks.binance_repository = mock(Binance.getInstance());
    });

    afterEach(() => {
        mocks.binance_repository.restore();
    });

    it('Should be able to generate wallets from history file', async () => {
        const agent = Agent.buildAgent();
        await agent.loadOperationFile(seed_csv_file);
        agent.generateWalletsState();
        const wallets = agent.getWallets();
        expect(wallets).to.have.property('ADA');
        expect(wallets.ADA.getBalance()).to.equal(15);

        expect(wallets).to.have.property('EUR');
        expect(wallets.EUR.getBalance()).to.equal(-71);

        expect(wallets).to.have.property('DOT');
        expect(wallets.DOT.getBalance()).to.equal(2);
    });


    it.only('Should be able to generate wallets from history file', async () => {

        mocks.binance_repository
            .expects('getLatestPrice')
            .withArgs('ADAEUR')
            .returns(Promise.resolve(
                {
                    symbol: 'ADAEUR',
                    price: '1.10980000',
                })
            );

        mocks.binance_repository
            .expects('getLatestPrice')
            .withArgs('DOTEUR')
            .returns(Promise.resolve(
                {
                    symbol: 'DOTEUR',
                    price: '30.54100000',
                })
            );


        const agent = Agent.buildAgent();
        await agent.loadOperationFile(seed_csv_file);
        agent.generateWalletsState();

        const agent_balance = await agent.calculateAgentBalance('EUR');
        const eur_wallet = await agent.getBalanceFromWallet('EUR');

        console.log(agent_balance);
        console.log(eur_wallet);
    });


});
