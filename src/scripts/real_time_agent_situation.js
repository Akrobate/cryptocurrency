'use strict';

const {
    Agent,
} = require('../business_modules');

const csv_file = './data/binance_history.csv';

function formatWalletDisplay(wallet) {
    const str = `${wallet.getCurrency()} \t ${wallet.getBalance()} \t ${wallet.getBalanceEuro()} \t ${wallet.price_euro}`;
    console.log(str);
}

function format4Decimals(num) {
    return Math.trunc(num * 10000) / 10000;
}


(async () => {

    try {
        const agent = Agent.buildAgent();
        await agent.loadOperationFile(csv_file);
        agent.generateWalletsState();
        const agent_balance = await agent.calculateAgentBalance('EUR');
        const eur_wallet = await agent.getBalanceFromWallet('EUR');
        agent.getWalletsWithAmount().map(formatWalletDisplay);
        const revenue = eur_wallet + agent_balance;
        console.log('Revenue: ', format4Decimals(revenue));
    } catch (error) {
        console.log(error.response.data);
    }

})();
