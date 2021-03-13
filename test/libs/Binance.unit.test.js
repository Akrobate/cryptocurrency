/* eslint-disable sort-keys */

'use strict';

const {
    expect,
} = require('chai');
const {
    mock,
} = require('sinon');
const axios = require('axios');

const Binance = require('../../src/libs/Binance');

describe.only('Binance API', () => {
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

        // mocks.axios.expects('get')
        //     .once()
        //     .returns(Promise.resolve({ data: {}}))

        binance
            .checkConnectivity()
            .then((response) => {
                expect(response).to.deep.equal({});
                done();
            })
            .catch(done);
    });

    it('Should be able to get server time', (done) => {
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

});
