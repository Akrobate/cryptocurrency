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
     * @param {String} file
     * @returns {Params}
     */
    loadOperationFile(file) {
        return this.operations_history.loadCsvOperations(file);
    }


    /**
     * @param {OperationsHistory} operations_history
     * @returns {Object}
     */
    generateWalletsState() {
        const operation_list = this
            .operations_history.getOperationList();
        operation_list.forEach((operation) => {
            // Todo init wallets here;
            console.log(operation);
        });
    }

}

module.exports = {
    Agent,
};
