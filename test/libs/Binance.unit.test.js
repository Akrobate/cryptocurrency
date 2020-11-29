const { expect } = require('chai');
const { mock } = require('sinon');
const axios = require('axios');
const Binance = require('../../src/libs/Binance');


describe.only('Binance API', function() {
    
    this.timeout(20000);

    const mocks = {};
    let binance = null;

    beforeEach((done) => {
        // mocks.axios = mock(axios);
        binance = new Binance();
        done();
    });
 
    // afterEach(() => {
    //     mocks.axios.restore();
    // });

    it('Should be able to check connectivity', (done) => {

        // mocks.axios.expects('get')
        //     .once()
        //     .returns(Promise.resolve({ data: {}}))

        binance
            .checkConnectivity()
            .then((response) => {
                expect(response).to.equal({});
                done();
            })
            .catch(done)
    })

})