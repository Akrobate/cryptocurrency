'use strict';

const {
    OperationsHistory,
} = require('./OperationsHistory');


class Agent {


    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        this.name = name;
        console.log(`Agent declared: ${this.name}`);

        this.operations_history = new OperationsHistory();
        this.wallets = {};
    }

    /**
     * @param {OperationsHistory} operations_history
     * @returns {Object}
     */
    generateWalletsState(operations_history) {
        
    }

}

module.exports = {
    Agent,
};
