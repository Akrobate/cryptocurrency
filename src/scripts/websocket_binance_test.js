'use strict';

const WebSocket = require('ws');

// // URL connection

try {
    // const ticker = new WebSocket('wss://stream.binance.com:9443/ws/adaeur@miniTicker');
    const ticker = new WebSocket('wss://stream.binance.com:9443/ws/stream');
    ticker.onopen = () => {
        console.log('opened....');
        ticker.send(JSON.stringify(
            {
                method: 'SUBSCRIBE',
                params: [
                    'adaeur@miniTicker',
                    // 'doteur@miniTicker',
                ],
                id: 1,
            }
        ));
    };
    ticker.onmessage = (event) => {
        // console.log('WebSocket message received:', event);
        if (event.data) {
            const data = JSON.parse(event.data);
            console.log(data);
        }
    };
} catch (error) {
    console.log(error);
}
