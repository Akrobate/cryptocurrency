'use strict';

const {
    Agent,
} = require('../business_modules');

const csv_file = './data/binance_history.csv';

function formatWalletDisplay(wallet, agent, average_prices) {

    const data = prepareDataToDisplay(wallet, average_prices);

    const {
        currency,
        currency_ballance,
        euro_ballance,
        usdt_avg_price,
        price_euro,
        price_usdt,
    } = prepareDataToDisplay(wallet, average_prices);

    let str = `${currency} ============
    Ballance:       ${currency_ballance} ${currency}
    Euro ballance:  ${euro_ballance} euro
    Euro price:     ${price_euro} euro
    USDT price:     ${price_usdt} USDT`;
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


function prepareDataToDisplay(wallet, average_prices) {

    const currency = wallet.getCurrency();
    const currency_ballance = wallet.getBalance();
    const euro_ballance = wallet.getBalanceEuro();
    const data = {
        currency,
        currency_ballance,
        euro_ballance,
        usdt_avg_price: average_prices[currency]?.USDT?.average,
        price_euro: wallet.price_euro,
        price_usdt: wallet.price_usdt,
    }

    return data;
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
        console.log(error);
    }

})();
