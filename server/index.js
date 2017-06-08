const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();
const API_URL = process.env.API_URL || '';

const server = http.createServer(app);

sendIndexHtml = (req, res) => {
    res.sendFile('public/index.html', {root: '.'});
};

if (API_URL) {
    fs.writeFile('./public/env.js', `window.env = {apiURL: '${API_URL}'};`);
}

app.use((req, res, next) => {
    next();
}, express.static('public'));

app.use(sendIndexHtml);

server.listen(80, function () {
    const port = server.address().port;
    console.log('Listening at http://%s', port);
});
