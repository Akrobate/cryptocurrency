'use strict'

/**
 *
 */

class OperationsHistory {

    constructor(eur) {
        this.data = [];
        this.current_pointer = -1;
    }

    add(operation) {
        this.data.push(operation);
        this.current_pointer++;
    }

    getLast() {
        return this.data[this.current_pointer];
    }

    empty() {
        if (this.current_pointer == -1 ) {
            return true;
        }
        return false;
    }
}


module.exports = OperationsHistory;
