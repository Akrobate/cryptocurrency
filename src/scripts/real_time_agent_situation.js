'use strict';

const {
    Agent,
} = require('../src/business_modules');


(async () => {

    const agent = Agent.buildAgent();
    await agent.loadOperationFile(seed_csv_file);
    agent.generateWalletsState();
    const agent_balance = await agent.calculateAgentBalance('EUR');
    const eur_wallet = await agent.getBalanceFromWallet('EUR');
    console.log(agent_balance);
    console.log(eur_wallet);

})();
