const {
    MongoDbRepository,
} = require('./MongoDbRepository');
const {
    Binance,
    CryptoCompare,
    MinerGate,
} = require('./api');

module.exports = {
    MongoDbRepository,
    api: {
        Binance,
        CryptoCompare,
        MinerGate,
    },
};
