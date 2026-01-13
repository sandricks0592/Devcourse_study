let server = require('./server');
let router = require('./router');
let request_Handler = require('./request_Handler');

const mariadb = require('./database/connect/mariadb.js');
mariadb.connect();

server.start(router.route, request_Handler.handle);