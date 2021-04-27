'use strict';

const {
    expect,
} = require('chai');

const {
    Agent,
} = require('../../src/business_modules');

describe.only('Agent unit test', () => {

    it('Should be able to init Agent object', () => {
        const agent = new Agent('Smith');
        expect(agent).to.have.property('name', 'Smith');
    });

    it.skip('Should be able to generate wallets from history file', (done) => {
        const agent = new Agent('Smith');
        agent
            .generateWalletsState()
            .then((data) => {
                // expectation here
                done();
            });
    });
});
