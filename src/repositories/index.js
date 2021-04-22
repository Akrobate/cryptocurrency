const {
    MongoDbRepository,
} = require('./MongoDbRepository');
const {
    CsvFile,
} = require('./CsvFile');
const {
    Binance,
    CryptoCompare,
    MinerGate,
} = require('./api');

module.exports = {
    MongoDbRepository,
    CsvFile,
    api: {
        Binance,
        CryptoCompare,
        MinerGate,
    },
};
