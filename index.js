'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';
        var nextAction = '';
        var dataJson = '';
        var followupEventJson = '';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';
                dataJson = '{}';
                followupEventJson = '{}';

                if (requestBody.result.action) {
                    if (requestBody.result.action === '장치제어'){
                        speech += '';
                    } else if (requestBody.result.action == '인사') {
                        speech += '안녕하세요';
                    } else if (requestBody.result.action == '배송문의') {
                        speech += '배송 문의 입니다.';
                        dataJson = '{"배송일자":"2017-03-01", "택배사":"대한통운", "도착예상일자":"2017-03-03"}';
                        followupEventJson = '{"followupEvent":{"name":"shippingTracking","data":{"shippingno":"111111"}}}';
                    } else if (requestBody.result.action === 'FAQ') {
                        speech += 'FAQ 입니다.';
                    } else {
                        speech += '이해하지 못했습니다.';
                    }
                }
/*
                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
*/
            }

        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'api-ai-webhook',
            data: dataJson,
            followupEvent: followupEventJson
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