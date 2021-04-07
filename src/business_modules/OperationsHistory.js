'use strict';

class OperationsHistory {


    // eslint-disable-next-line require-jsdoc
    constructor() {
        this.data = [];
        this.current_pointer = -1;
    }

    // eslint-disable-next-line require-jsdoc
    add(operation) {
        this.data.push(operation);
        this.current_pointer++;
    }

    /**
     * @return {Number}
     */
    getLast() {
        return this.data[this.current_pointer];
    }

    /**
     * @return {Boolean}
     */
    empty() {
        if (this.current_pointer === -1) {
            return true;
        }
        return false;
    }
}


module.exports = {
    OperationsHistory,
};
