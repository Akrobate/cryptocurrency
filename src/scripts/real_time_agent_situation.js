'use strict';

const {
    Agent,
} = require('../business_modules');

const csv_file = './data/binance_history.csv';

function formatWalletDisplay(wallet, agent, average_prices) {

    const usdt_avg_price = average_prices[wallet.getCurrency()]?.USDT?.average;
    let str = `${wallet.getCurrency()} ============
    Ballance:       ${wallet.getBalance()} ${wallet.getCurrency()}
    Euro ballance:  ${wallet.getBalanceEuro()} euro
    Euro price:     ${wallet.price_euro} euro
    USDT price:     ${wallet.price_usdt} USDT`;
    if (usdt_avg_price) {
        str += `\n    buy avg price: ${usdt_avg_price} USDT`;
    }
    console.log(str);
    agent
        .getOpenOrders()
        .filter((item) => item.symbol.includes(wallet.getCurrency()))
        .forEach((order) => {
            console.log('\x1b[32m%s\x1b[0m', `    --- Position ${order.symbol}`);
            console.log('\x1b[32m%s\x1b[0m', `        ${order.side} price ${order.price}`);
        });
}


(async () => {

    try {
        const agent = Agent.buildAgent();
        await agent.loadOperationFile(csv_file);
        agent.loadOpenOrders();
        agent.generateWalletsState();
        const agent_balance = await agent.calculateAgentBalance('EUR');
        const eur_wallet = await agent.getBalanceFromWallet('EUR');

        const average_prices = agent.getOwnedCurrenciesAveragePrice();

        agent.getWalletsWithAmount().map(
            (item) => formatWalletDisplay(item, agent, average_prices)
        );
        const revenue = eur_wallet + agent_balance;
        console.log(`Revenue: ${revenue.toFixed(4)}`);

    } catch (error) {
        console.log(error.response.data);
    }

})();
