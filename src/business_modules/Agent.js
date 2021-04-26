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
        const operation_list = operations_history.getOperationList();
        operation_list.forEach((operation) => {
            // Todo init wallets here;
            console.log(operation);
        });
    }

}

module.exports = {
    Agent,
};
