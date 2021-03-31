/* eslint-disable sort-keys */

'use strict';

const {
    mock,
} = require('sinon');
const {
    expect,
} = require('chai');
const axios = require('axios');
const {
    CryptoCompare,
} = require('../../../src/repositories/api');


const mocks = {};
let crypto_compare = null;

describe('CryptoCompare', () => {

    beforeEach(() => {
        mocks.axios = mock(axios);
        crypto_compare = new CryptoCompare();
    });

    afterEach(() => {
        mocks.axios.restore();
        crypto_compare = null;
    });

    it('Should be able to get coinlist', (done) => {

        mocks.axios.expects('get')
            .withArgs('https://min-api.cryptocompare.com/data/all/coinlist')
            .once()
            .returns(Promise.resolve(
                {
                    data: {
                        Data: {
                            POLAR: {
                                Id: '940224',
                                Url: '/coins/polar/overview',
                                ImageUrl: '/media/37746812/polar.png',
                                ContentCreatedOn: 1617189485,
                                Name: 'POLAR',
                                Symbol: 'POLAR',
                                CoinName: 'Polaris',
                                FullName: 'Polaris (POLAR)',
                                Description: 'Polaris is a farming protocol and launchpad platform designed to solve several issues with liquidity mining (yield farming) on Binance Smart Chain.',
                                AssetTokenStatus: 'N/A',
                                Algorithm: 'N/A',
                                ProofType: 'N/A',
                                SortOrder: '6842',
                                Sponsored: false,
                                Taxonomy: [Object],
                                Rating: [Object],
                                IsTrading: false,
                                TotalCoinsMined: 94870.01072727273,
                                BlockNumber: 0,
                                NetHashesPerSecond: 0,
                                BlockReward: 0,
                                BlockTime: 0,
                                AssetLaunchDate: '2021-03-11',
                                MaxSupply: -1,
                                MktCapPenalty: 0,
                                PlatformType: 'token',
                                DecimalPoints: 18,
                                BuiltOn: 'BNB',
                                SmartContractAddress: '0x3a5325f0e5ee4da06a285e988f052d4e45aa64b4',
                            },
                        },
                        BaseImageUrl: 'https://www.cryptocompare.com',
                        BaseLinkUrl: 'https://www.cryptocompare.com',
                        RateLimit: {},
                        HasWarning: false,
                        Type: 100,
                        Response: 'Success',
                        Message: 'Coin list succesfully returned!',
                    },
                }
            ));

        crypto_compare.getCoinList()
            .then((data) => {
                console.log(data);
                try {
                    expect(data).to.haveOwnProperty('Response');
                    expect(data).to.haveOwnProperty('Message');
                    expect(data).to.haveOwnProperty('BaseImageUrl');
                    expect(data).to.haveOwnProperty('BaseLinkUrl');
                    expect(data).to.haveOwnProperty('Data');
                    expect(data).to.haveOwnProperty('Type');
                } catch (error) {
                    return done(error);
                }
                return done();
            });
    });

    it.skip('Should be able to getPrice', (done) => {
        crypto_compare.getPrice(
            'ETH', 'BTC,USD,EUR')
            .then((data) => {
                console.log(data);
                try {
                    expect(data).to.haveOwnProperty('BTC');
                    expect(data).to.haveOwnProperty('USD');
                    expect(data).to.haveOwnProperty('EUR');
                } catch (error) {
                    return done(error);
                }
                return done();
            });
    })
        .timeout(10000);

    it('Should be able to get historical data', (done) => {
        const params = {
            fsym: 'BTC',
            tsyms: 'EUR,USD',
            timestamp: Math.ceil(Date.now() / 1000),
        };
        crypto_compare.getPriceHistorical(params)
            .then((response) => {
                expect(response).to.haveOwnProperty('BTC');
                expect(response.BTC).to.haveOwnProperty('EUR');
                expect(response.BTC).to.haveOwnProperty('USD');
                done();
            })
            .catch(done);
    })
        .timeout(20000);

});
