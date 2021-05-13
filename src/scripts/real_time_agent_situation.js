'use strict';

const {
    Agent,
} = require('../business_modules');

const csv_file = './data/binance_history.csv';

function formatWalletDisplay(wallet, agent) {

    const str = `${wallet.getCurrency()} ============
    Ballance:       ${wallet.getBalance()} ${wallet.getCurrency()}
    Euro ballance:  ${wallet.getBalanceEuro()} euro
    Euro price:     ${wallet.price_euro} euro
    USDT price:     ${wallet.price_usdt} USDT`;

    console.log(str);


    agent
        .getOpenOrders()
        .filter((item) => item.symbol.includes(wallet.getCurrency()))
        .forEach((order) => {
            console.log('\x1b[32m%s\x1b[0m', `    --- Position ${order.symbol}`);
            console.log('\x1b[32m%s\x1b[0m', `        ${order.side} price ${order.price}`);
        });

}

function format4Decimals(num) {
    return Math.trunc(num * 10000) / 10000;
}


(async () => {

    try {
        const agent = Agent.buildAgent();
        await agent.loadOperationFile(csv_file);
        agent.loadOpenOrders();
        agent.generateWalletsState();
        const agent_balance = await agent.calculateAgentBalance('EUR');
        const eur_wallet = await agent.getBalanceFromWallet('EUR');
        agent.getWalletsWithAmount().map(
            (item) => formatWalletDisplay(item, agent)
        );
        const revenue = eur_wallet + agent_balance;
        console.log('Revenue: ', format4Decimals(revenue));

        // Work in progress
        // agent.getOwnedCurrenciesAveragePrice().map(console.log);
    } catch (error) {
        console.log(error.response.data);
    }

})();
