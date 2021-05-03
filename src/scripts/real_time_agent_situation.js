'use strict';

const {
    Agent,
} = require('../business_modules');

const csv_file = './data/binance_history.csv';

(async () => {

    try {
        const agent = Agent.buildAgent();
        await agent.loadOperationFile(csv_file);
        agent.generateWalletsState();
        const agent_balance = await agent.calculateAgentBalance('EUR');
        const eur_wallet = await agent.getBalanceFromWallet('EUR');
        console.log(agent_balance);
        console.log(eur_wallet);
    } catch (error) {
        console.log(error.response.data);
    }

})();
