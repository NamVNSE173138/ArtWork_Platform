const createError = require("http-errors");
const mongoose = require("mongoose");
const moment = require("moment");
const { decodeToken } = require("../Config/config");
const Checkout = require("../Models/checkout");
// require('dotenv').config();

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
        process.env.TZ = 'Asia/Ho_Chi_Minh';

        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        // let config = require('config');

        let tmnCode = process.env.VNP_TMNCODE;
        let secretKey = process.env.VNP_SECRETKEY;
        let vnpUrl = process.env.VNP_URL;
        let returnUrl = process.env.VNP_RETURNURL;


        // let tmnCode = "J6FWHWSG";
        // let secretKey = "NTPZPCKNVCMJUQPPVTKQTGAOCEKAGQLY";
        // let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        // let returnUrl = "http://localhost:5000/checkouts/vnpay_ipn";


        // let returnUrl = "http://localhost:3000/order/vnpay_return";
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        let bankCode = "VNBANK";
        // let bankCode = req.body.bankCode;
        // let locale = req.body.language;
        let locale = "vn";
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
        vnp_Params['vnp_Amount'] = amount * 100 * 24000;
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
        let signed = hmac.update(new Buffer.alloc(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        res.send(vnpUrl)
    },

    getVnpayIPN: async function (req, res, next) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        var config = require('config');
        var secretKey = config.get('vnp_HashSecret');
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer.alloc(signData, 'utf-8')).digest("hex");


        if (secureHash === signed) {
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
            res.status(200).json({ RspCode: '00', Message: 'success' })
        }
        else {
            res.status(200).json({ RspCode: '97', Message: 'Fail checksum' })
        }
    },

    saveBillTransaction: async (req, res, next) => {

        const token = req.headers.token;
        console.log("token to vnpay", token);
        try {
            const userInfo = decodeToken(token);
            const userId = userInfo?.data?.checkEmail?._id

            const queryString = req.url.split('?')[1];
            const urlParams = new URLSearchParams(queryString);

            const amount = urlParams.get('vnp_Amount');
            const bankName = urlParams.get('vnp_BankCode');
            const payDate = urlParams.get('vnp_PayDate');
            const transCode = urlParams.get('vnp_BankTranNo');

            const billData = {
                user: userId,
                amount,
                bankName,
                payDate,
                transCode,
            };

            const bill = new Checkout(billData);
            const result = await bill.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
    }
}