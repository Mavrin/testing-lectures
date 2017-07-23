const http = require('http');
const fs = require('fs');
const {resolve} = require('path');
const port = 3000;

const requestHandler = (request, response) => {
    if (request.url.includes('app.js')) {
        fs.createReadStream(resolve(__dirname, './dist/app.js')).pipe(response);
    } else {
        fs.createReadStream(resolve(__dirname, './index.html')).pipe(response);
    }

};

const server = http.createServer(requestHandler);

module.exports = function (done) {
    server.listen(port, (err) => {
        if (err) {
            return console.log('something bad happened', err)
        }

        console.log(`server is listening on ${port}`)
        done();
    });
    return server;
};

