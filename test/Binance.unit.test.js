const { expect } = require('chai')
const Binance = require('../../src/libs/Binance');

describe('Binance API', () => {
    
    const mock = {};
    let binance = null;

    beforeEach(() => {
        mocks.request = mock(request);
        binance = new Binance();
    });

    it('Should be able to check connectivity', (done) => {
        binance
            .checkConnectivity()
            .then((response) => {
                expect(response).to.equal({});
                done();
            })
    })

})