'use strict';

const { mock } = require('sinon');
const CryptoCompare = require('../../src/libs/CryptoCompare');
const request = require('request');

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
        crypto_compare.getCoinList((data) => {
            console.log(data)
            done()
        })
    })

});
