const mariadb = require('./database/connect/mariadb.js');


function main(response) {
    console.log('main');

    mariadb.query('select * from product', function(err, rows){
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('leejihwan');
    response.end();
}

function login(response) {
    console.log('login');

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write('login page');
    response.end();
}

let handle = {}; // key:value
handle['/'] = main;
handle['/login'] = login;

exports.handle = handle;