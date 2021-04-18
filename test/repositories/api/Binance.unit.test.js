/* eslint-disable sort-keys */

'use strict';

const {
    expect,
} = require('chai');
const {
    mock,
} = require('sinon');
const axios = require('axios');

const {
    Binance,
} = require('../../../src/repositories/api');

describe('Binance API', () => {
    const mocks = {};
    let binance = null;

    beforeEach((done) => {
        mocks.axios = mock(axios);
        binance = new Binance();
        done();
    });

    afterEach(() => {
        mocks.axios.restore();
    });

    it('Should be able to check connectivity', (done) => {

        mocks.axios.expects('get')
            .once()
            .returns(Promise.resolve(
                {
                    data: {},
                }
            ));

        binance
            .checkConnectivity()
            .then((response) => {
                expect(response).to.deep.equal({});
                done();
            })
            .catch(done);
    });

    it('Should be able to get server time', (done) => {
        mocks.axios.expects('get')
            .once()
            .returns(Promise.resolve(
                {
                    data: {
                        serverTime: 1615727105297,
                    },
                }
            ));
        binance
            .getServerTime()
            .then((response) => {
                expect(response).to.have.property('serverTime');
                expect(response.serverTime).to.be.greaterThan(0);
                done();
            })
            .catch(done);
    });

    it('Should be able to get exchange info', (done) => {
        mocks.axios.expects('get')
            .withArgs('https://api.binance.com/api/v3/exchangeInfo')
            .returns(Promise.resolve(
                {
                    data: {
                        serverTime: 987987,
                        rateLimits: null,
                        timezone: null,
                        exchangeFilters: [],
                        symbols: [
                            {
                                symbol: 'ETHBTC',
                                status: 'TRADING',
                                baseAsset: 'ETH',
                                baseAssetPrecision: 8,
                                quoteAsset: 'BTC',
                                quotePrecision: 8,
                                quoteAssetPrecision: 8,
                                baseCommissionPrecision: 8,
                                quoteCommissionPrecision: 8,
                                orderTypes: [],
                                icebergAllowed: true,
                                ocoAllowed: true,
                                quoteOrderQtyMarketAllowed: true,
                                isSpotTradingAllowed: true,
                                isMarginTradingAllowed: true,
                                filters: [],
                                permissions: [],
                            },
                            {
                                symbol: 'LTCBTC',
                                status: 'TRADING',
                                baseAsset: 'LTC',
                                baseAssetPrecision: 8,
                                quoteAsset: 'BTC',
                                quotePrecision: 8,
                                quoteAssetPrecision: 8,
                                baseCommissionPrecision: 8,
                                quoteCommissionPrecision: 8,
                                orderTypes: [],
                                icebergAllowed: true,
                                ocoAllowed: true,
                                quoteOrderQtyMarketAllowed: true,
                                isSpotTradingAllowed: true,
                                isMarginTradingAllowed: true,
                                filters: [],
                                permissions: [],
                            },
                        ],
                    },
                })
            );

        binance
            .getExchangeInfo()
            .then((response) => {
                expect(response).to.have.property('serverTime');
                expect(response).to.have.property('rateLimits');
                expect(response).to.have.property('timezone');
                expect(response).to.have.property('exchangeFilters');
                expect(response).to.have.property('symbols');
                done();
            })
            .catch(done);
    });

    it('Should be able to get current average price', (done) => {

        mocks.axios.expects('get')
            .once()
            .returns(Promise.resolve(
                {
                    data: {
                        mins: 5,
                        price: 0.89737216,
                    },
                }
            ));

        binance
            .getCurrentAveragePrice('ADAEUR')
            .then((response) => {
                expect(response).to.have.property('mins', 5);
                expect(response).to.have.property('price');
                done();
            })
            .catch(done);
    });

    it('Should be able to get24HoursTickerPriceChangeStatistics', (done) => {
        mocks.axios.expects('get')
            .once()
            .withArgs(
                'https://api.binance.com/api/v3/ticker/24hr',
                {
                    params: {
                        symbol: 'ADAEUR',
                    },
                }
            )
            .returns(Promise.resolve(
                {
                    data: {
                        symbol: 'ADAEUR',
                        priceChange: '0.01343000',
                        priceChangePercent: '1.570',
                        weightedAvgPrice: '0.87036957',
                        prevClosePrice: '0.85519000',
                        lastPrice: '0.86871000',
                        lastQty: '60.40000000',
                        bidPrice: '0.86860000',
                        bidQty: '592.50000000',
                        askPrice: '0.86870000',
                        askQty: '4708.00000000',
                        openPrice: '0.85528000',
                        highPrice: '0.89400000',
                        lowPrice: '0.84250000',
                        volume: '19796612.10000000',
                        quoteVolume: '17230368.73701800',
                        openTime: 1615810169191,
                        closeTime: 1615896569191,
                        firstId: 4730001,
                        lastId: 4781024,
                        count: 51024,
                    },
                }
            ));

        binance
            .get24HoursTickerPriceChangeStatistics('ADAEUR')
            .then((response) => {
                expect(response).to.have.property('symbol', 'ADAEUR');
                expect(response).to.have.property('priceChange', '0.01343000');
                expect(response).to.have.property('priceChangePercent', '1.570');
                expect(response).to.have.property('weightedAvgPrice', '0.87036957');
                expect(response).to.have.property('prevClosePrice', '0.85519000');
                expect(response).to.have.property('lastPrice', '0.86871000');
                expect(response).to.have.property('lastQty', '60.40000000');
                expect(response).to.have.property('bidPrice', '0.86860000');
                expect(response).to.have.property('bidQty', '592.50000000');
                expect(response).to.have.property('askPrice', '0.86870000');
                expect(response).to.have.property('askQty', '4708.00000000');
                expect(response).to.have.property('openPrice', '0.85528000');
                expect(response).to.have.property('highPrice', '0.89400000');
                expect(response).to.have.property('lowPrice', '0.84250000');
                expect(response).to.have.property('volume', '19796612.10000000');
                expect(response).to.have.property('quoteVolume', '17230368.73701800');
                expect(response).to.have.property('openTime', 1615810169191);
                expect(response).to.have.property('closeTime', 1615896569191);
                expect(response).to.have.property('firstId', 4730001);
                expect(response).to.have.property('lastId', 4781024);
                expect(response).to.have.property('count', 51024);
                done();
            })
            .catch(done);
    });

    it('Should be able to getAll24HoursTickerPriceChangeStatistics', (done) => {
        mocks.axios.expects('get')
            .once()
            .returns(Promise.resolve(
                {
                    data: [
                        {
                            symbol: 'ADAEUR',
                            priceChange: '0.01343000',
                            priceChangePercent: '1.570',
                            weightedAvgPrice: '0.87036957',
                            prevClosePrice: '0.85519000',
                            lastPrice: '0.86871000',
                            lastQty: '60.40000000',
                            bidPrice: '0.86860000',
                            bidQty: '592.50000000',
                            askPrice: '0.86870000',
                            askQty: '4708.00000000',
                            openPrice: '0.85528000',
                            highPrice: '0.89400000',
                            lowPrice: '0.84250000',
                            volume: '19796612.10000000',
                            quoteVolume: '17230368.73701800',
                            openTime: 1615810169191,
                            closeTime: 1615896569191,
                            firstId: 4730001,
                            lastId: 4781024,
                            count: 51024,
                        },
                    ],
                }
            ));

        binance
            .getAll24HoursTickerPriceChangeStatistics('ADAEUR')
            .then((response) => {
                expect(response).to.be.an('Array');
                const [first] = response;

                expect(first).to.have.property('symbol', 'ADAEUR');
                expect(first).to.have.property('priceChange', '0.01343000');
                expect(first).to.have.property('priceChangePercent', '1.570');
                expect(first).to.have.property('weightedAvgPrice', '0.87036957');
                expect(first).to.have.property('prevClosePrice', '0.85519000');
                expect(first).to.have.property('lastPrice', '0.86871000');
                expect(first).to.have.property('lastQty', '60.40000000');
                expect(first).to.have.property('bidPrice', '0.86860000');
                expect(first).to.have.property('bidQty', '592.50000000');
                expect(first).to.have.property('askPrice', '0.86870000');
                expect(first).to.have.property('askQty', '4708.00000000');
                expect(first).to.have.property('openPrice', '0.85528000');
                expect(first).to.have.property('highPrice', '0.89400000');
                expect(first).to.have.property('lowPrice', '0.84250000');
                expect(first).to.have.property('volume', '19796612.10000000');
                expect(first).to.have.property('quoteVolume', '17230368.73701800');
                expect(first).to.have.property('openTime', 1615810169191);
                expect(first).to.have.property('closeTime', 1615896569191);
                expect(first).to.have.property('firstId', 4730001);
                expect(first).to.have.property('lastId', 4781024);
                expect(first).to.have.property('count', 51024);
                done();
            })
            .catch(done);
    });

    it.only('Should be able to get current price', (done) => {

        mocks.axios.expects('get')
            .once()
            .returns(Promise.resolve(
                {
                    data: {
                        symbol: 'ADAEUR',
                        price: '1.07795000',
                    },
                }
            ));

        binance
            .getLatestPrice('ADAEUR')
            .then((response) => {
                expect(response).to.have.property('symbol', 'ADAEUR');
                expect(response).to.have.property('price');
                done();
            })
            .catch(done);
    });

});
