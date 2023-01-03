const http = require('http');

// importing custome module from a file 
const routes = require('./routes');

// for any request it will execute
const server = http.createServer(routes);

// const server = http.createServer(routes.handler);

server.listen(3000);