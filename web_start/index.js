let server = require('./server');
let router = require('./router');
let request_Handler = require('./request_Handler');

server.start(router.route, request_Handler.handle);