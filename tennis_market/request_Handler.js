const fs = require('fs');
const main_view = fs.readFileSync('./main.html');
const orderlist_view = fs.readFileSync('./order_list.html');

const mariadb = require('./database/connect/mariadb');

function main(response) {
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err, rows) {
        console.log(rows);
    })

    response.writeHead(200, {'Content-Type' : 'text/html'});
    response.write(main_view);
    response.end();    
}

function redRacket(response) {
    fs.readFile('./img/redRacket.png', function(err, data) {
        // 이미지는 image/png로 작성해야 합니다.
        response.writeHead(200, {'Content-Type' : 'image/png'}); 
        response.write(data);
        response.end(); 
    })
}

function blueRacket(response) {
    fs.readFile('./img/blueRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function blackRacket(response) {
    fs.readFile('./img/blackRacket.png', function(err, data) {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.write(data);
        response.end(); 
    })
}

function order(response, productId) {
    response.writeHead(200, {'Content-Type' : 'text/html'});

    // 1. 날짜 형식을 NOW()로 변경하여 에러 방지
    // 2. 에러(err)가 발생했는지 확인하는 로직 추가
    mariadb.query("INSERT INTO orderlist VALUES (" + productId + ", NOW());", function(err, rows) {
        if (err) {
            console.log(err); // 에러가 발생하면 에러 내용을 출력
        } else {
            console.log(rows); // 성공하면 OkPacket(스크린샷의 내용) 출력
        }
    })

    response.write('Thank you for your order! <br> you can check the result on the order list page.');
    response.end(); 
}

function orderlist(response) {
    console.log('orderlist');

    response.writeHead(200, {'Content-Type' : 'text/html'});

    mariadb.query("SELECT * FROM orderlist", function(err, rows) {
        response.write(orderlist_view);

        rows.forEach(element => {
            response.write("<tr>" 
                        + "<td>"+element.product_id+"</td>"
                        + "<td>"+element.order_date+"</td>"
                        + "</tr>");
        });
        
        response.write("</table>");
        response.end();
    })
}


let handle = {}; // key:value
handle['/'] = main;
handle['/order'] = order;
handle['/orderlist'] = orderlist;

/* image directory */
handle['/img/redRacket.png'] = redRacket;
handle['/img/blueRacket.png'] = blueRacket;
handle['/img/blackRacket.png'] = blackRacket;

exports.handle = handle;