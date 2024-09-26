const express = require("express")
const app = express();
const server = require('http').createServer(app)
const WebSocket = require('ws')
var request = require('request');

const wss = new WebSocket.Server({server});

wss.on('connection', function connection(ws) {
    ws.send("welcome")
    ws.on('message', function incoming(message) {
        console.log(message)
    })
})

const API_KEY = ''; // Replace with your Alpha Vantage API key
const SYMBOL = 'IBM';
const INTERVAL = '5min';
const ALPHA_VANTAGE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${SYMBOL}&interval=${INTERVAL}&apikey=${API_KEY}`;


lastData = ''

function pollData() {
    request.get({
        url: ALPHA_VANTAGE_URL,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          const timeSeries = data["Time Series (5min)"]

            if (timeSeries) {
                const latestData = timeSeries[Object.keys(timeSeries)[0]];

                if (JSON.stringify(latestData) !== JSON.stringify(lastData)) {
                    lastData = latestData

                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ stockData: timeSeries }));
                        }
                    });
                } else{
                    console.log('no new data')
                }  
            }
        }
    });
}

setInterval(pollData, 60000); 

app.get('/', (req, res) => {
    res.send('Hello World');
});


server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
