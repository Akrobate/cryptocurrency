'use strict';

const WebSocket = require('ws');

class BinanceWebsocket {

    /**
     * @return {BinanceWebsocket}
     */
    static getInstance() {
        if (BinanceWebsocket.instance === null) {
            BinanceWebsocket.instance = new BinanceWebsocket();
        }
        return BinanceWebsocket.instance;
    }

    /**
     * @return {BinanceWebsocket}
     */
    constructor() {
        this.base_websocket_url = 'wss://stream.binance.com:9443/ws/stream';

        this.websocket_handler = null;
    }

    /**
     * initConnection
     * @returns {WebSocket}
     */
    initConnection() {
        // eslint-disable-next-line consistent-return
        return new Promise((resolve, reject) => {
            try {
                this.websocket_handler = new WebSocket(this.base_websocket_url);
                this.websocket_handler.onopen = () => resolve(this.websocket_handler);
            } catch (error) {
                return reject(error);
            }
        });
    }

    /**
     * @param {Array} params
     * @param {Number} id
     * @returns {Void}
     *
     * @example [
     *     'adaeur@ticker',
     *     // 'doteur@miniTicker',
     *     // '!ticker@arr',
     * ]
     */
    sendSuscribe(params, id = 1) {
        this.websocket_handler.send(JSON.stringify(
            {
                method: 'SUBSCRIBE',
                params,
                id,
            }
        ));

    }
}

BinanceWebsocket.instance = null;

module.exports = {
    BinanceWebsocket,
};
