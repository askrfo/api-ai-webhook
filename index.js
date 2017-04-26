'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');

var options = {
    hostname: 'liehacker.ddns.net',
    port: 8889,
    path: '/delivery_ec.php'
  };
 
const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        return res.json({
                                    speech: '주문하신 상품이 없습니다',
                                    displayText: '주문하신 상품이 없습니다',
                                    source: 'api-ai-webhook'
                                });


    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
