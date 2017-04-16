'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.action === '장치제어'){
                    speech += '{result:{code:false, message:"장치 제어 입니다."}}';
                } else if (requestBody.result.action == '배송문의') {
                    speech += '{result:{code:false, message:"배송 문의 입니다."}}';
                } else if (requestBody.result.action === 'FAQ') {
                    speech += '{result:{code:false, message:"FAQ 입니다."}}';
                } else {
                    speech += '{result:{code:false, message:"알수 없는 요청 입니다."}}';
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
            source: 'apiai-webhook-sample'
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