const express = require("express")
const app = express();
const server = require('http').createServer(app)

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});