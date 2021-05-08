'use strict';

const WebSocket = require('ws');


const alert = [
    {
        symbol: 'ADAEUR',
        name: 'Price is lower than 1.35258273',
        condition: {
            c: {
                lte: 1.35258273,
            },
        },
    },
];


/*
'!ticker@arr',

{
    "e": "24hrTicker",  // Event type
    "E": 123456789,     // Event time
    "s": "BNBBTC",      // Symbol
    "p": "0.0015",      // Price change
    "P": "250.00",      // Price change percent
    "w": "0.0018",      // Weighted average price
    "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
    "c": "0.0025",      // Last price
    "Q": "10",          // Last quantity
    "b": "0.0024",      // Best bid price
    "B": "10",          // Best bid quantity
    "a": "0.0026",      // Best ask price
    "A": "100",         // Best ask quantity
    "o": "0.0010",      // Open price
    "h": "0.0025",      // High price
    "l": "0.0010",      // Low price
    "v": "10000",       // Total traded base asset volume
    "q": "18",          // Total traded quote asset volume
    "O": 0,             // Statistics open time
    "C": 86400000,      // Statistics close time
    "F": 0,             // First trade ID
    "L": 18150,         // Last trade Id
    "n": 18151          // Total number of trades
  }

  */



// // URL connection

function display(data) {

    if (Object.keys(data).length > 2) {
        const a = data.filter((item) => item.s.includes('USDT'));
        const b = a.map((item) => item.s);
        // console.log(b.join(' - '));
        b.forEach((z) => console.log(z));
    }
}

try {
    // const ticker = new WebSocket('wss://stream.binance.com:9443/ws/adaeur@miniTicker');
    const ticker = new WebSocket('wss://stream.binance.com:9443/ws/stream');
    ticker.onopen = () => {
        console.log('opened....');
        ticker.send(JSON.stringify(
            {
                method: 'SUBSCRIBE',
                params: [
                    'adaeur@ticker',
                    // 'doteur@miniTicker',
                    // '!ticker@arr',
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
            // display(data);
        }
    };
} catch (error) {
    console.log(error);
}


function evalAlertCondition(condition, data) {
    
}

function checkAlert(alert_list, data) {

    const {
        e: event_type,
        s: symbol,
    } = data;

    if (event_type !== '24htTicker') {
        return null;
    }

    const symbol_alert_list = alert_list.filter((alert_item) => alert_item.symbol === symbol);
    return symbol_alert_list.filter((alert_item) => evalAlertCondition(alert_item.condition, data));
}

