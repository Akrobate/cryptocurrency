'use strict';

const { mock } = require('sinon');
const CryptoCompare = require('../../src/libs/CryptoCompare');
const request = require('request');
const { expect } = require('chai')

const mocks = {};
let crypto_compare = null;

describe('CryptoCompare', () => {

    beforeEach(() => {
        mocks.request = mock(request);
        crypto_compare = new CryptoCompare();
    });

    afterEach(() => {
        mocks.request.restore();
        crypto_compare = null;
    });

    it('Should be able to get coinlist', (done) => {
        crypto_compare.getCoinList()
            .then((data) => {
                try {
                    expect(data).to.haveOwnProperty('Response');
                    expect(data).to.haveOwnProperty('Message');
                    expect(data).to.haveOwnProperty('BaseImageUrl');
                    expect(data).to.haveOwnProperty('BaseLinkUrl');
                    expect(data).to.haveOwnProperty('DefaultWatchlist');
                    expect(data).to.haveOwnProperty('SponosoredNews');
                    expect(data).to.haveOwnProperty('Data');
                    expect(data).to.haveOwnProperty('Type');
                } catch (error) {
                    return done(error);
                }
                done();
            })
    })

    
    it('Should be able to getPrice', (done) => {
        crypto_compare.getPrice(
            'ETH', 'BTC,USD,EUR')
            .then((data) => {
                try {
                    expect(data).to.haveOwnProperty('BTC');
                    expect(data).to.haveOwnProperty('USD');
                    expect(data).to.haveOwnProperty('EUR');
                } catch (error) {
                    return done(error);
                }
                done();
            })
    })

    it('Should be able to get historical data', (done) => {  
        const params = {
            fsym: 'BTC',
            tsyms: 'EUR,USD',
            timestamp: Date.now() / 1000 | 0,
        };
        crypto_compare.getPriceHistorical(params)
            .then((response) => {
                expect(response).to.haveOwnProperty('BTC');
                expect(response.BTC).to.haveOwnProperty('EUR');
                expect(response.BTC).to.haveOwnProperty('USD');
                done();
            });
    });
});
