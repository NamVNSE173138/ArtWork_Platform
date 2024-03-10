const createError = require("http-errors");
const mongoose = require("mongoose");
const moment = require("moment")
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
module.exports = {
    createPaymentUrl: async (req, res, next) => {

        process.env.TZ = 'Asia/Ho_Chi_Minh'; //ngay đây hả ghi sao fen

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // let config = require('config');

        // let tmnCode = config.get('vnp_TmnCode');
        // let secretKey = config.get('vnp_HashSecret');
        // let vnpUrl = config.get('vnp_Url');
        // let returnUrl = config.get('vnp_ReturnUrl');
        let tmnCode = "J6FWHWSG";
        let secretKey = "NTPZPCKNVCMJUQPPVTKQTGAOCEKAGQLY";
        let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        let returnUrl = "http://localhost:8888/order/vnpay_return";
        // let returnUrl = "http://localhost:3000/order/vnpay_return";
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;
        // let amount = 50000;
        // let bankCode = "VNBANK";

        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        // let locale = 'vn';
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        console.log("vnurl", vnpUrl);
        res.send(vnpUrl)
    }
}