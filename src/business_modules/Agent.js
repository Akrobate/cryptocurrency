'use strict';


class Agent {


    // eslint-disable-next-line require-jsdoc
    constructor(name) {
        this.name = name;
        console.log(`Agent declared: ${this.name}`);
    }

}

module.exports = {
    Agent,
};
