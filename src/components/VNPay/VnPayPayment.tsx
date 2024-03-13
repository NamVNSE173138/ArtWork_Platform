import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    nickname: string;
    role: string;
    numOfFollower: number;
    avatar: string;
    password: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface BillDetail {
    _id: string;
    user?: User;
    amount: number;
    bankName: string;
    payDate: string;
    transCode: string;
}

const VnPayPayment: React.FC = () => {
    const userToken = localStorage.getItem("USER");

    const [currentUser, setCurrentUser] = useState<User>({
        id: "",
        email: "",
        password: "",
        nickname: "",
        role: "",
        numOfFollower: 0,
        avatar: "",
        status: false,
        createdAt: "",
        updatedAt: "",
    });

    const [billDetail, setBillDetail] = useState<BillDetail>({
        _id: "",
        user: {
            id: "",
            email: "",
            nickname: "",
            role: "",
            numOfFollower: 0,
            avatar: "",
            password: "",
            status: false,
            createdAt: "",
            updatedAt: "",
        },
        amount: 0,
        bankName: "",
        payDate: "",
        transCode: "",
    });



    useEffect(() => {
        const queryString = window.location.search;
        console.log("queryString:", queryString);

        const urlParams = new URLSearchParams(queryString);
        console.log("urlParams:", urlParams);

        const bankName = urlParams.get('vnp_BankCode');
        console.log("bankName:", bankName);

        const amount = urlParams.get('vnp_Amount');
        console.log("amount:", amount);

        const payDate = urlParams.get('vnp_PayDate');
        console.log("payDate:", payDate);

        const transCode = urlParams.get('vnp_BankTranNo');
        console.log("transCode:", transCode);

        const saveBillTransaction = async () => {
            try {
                console.log("token to vnpay in client", userToken);

                console.log("user", currentUser.id);
                if (!currentUser || !currentUser.id) {
                    console.error("Current user data is not available");
                    // return;
                }

                // const queryString = window.location.search;
                // console.log("url", queryString);

                // const urlParams = new URLSearchParams(queryString);

                console.log("vnp url", queryString);


                const amount = urlParams.get('vnp_Amount');
                const bankName = urlParams.get('vnp_BankCode');
                const payDate = urlParams.get('vnp_PayDate');
                const transCode = urlParams.get('vnp_BankTranNo');

                console.log("Amount: ", amount)

                // const billData = {
                //     userId,
                //     amount,
                //     bankName,
                //     payDate,
                //     transCode,
                // };

                const response = await axios.post(
                    'http://localhost:5000/checkouts/billDetail',
                    { user: currentUser.id },
                    {
                        headers: {
                            Authorization: userToken,
                        },
                    }
                );

                console.log('Bill transaction saved:', response.data);
            } catch (error) {
                console.error('Error saving bill transaction:', error);
            }
        };

        saveBillTransaction();
    }, []);

    // const queryString = window.location.search;


    // const urlParams = new URLSearchParams(queryString);

    // const bankName = urlParams.get('vnp_BankCode');


    // const amount = urlParams.get('vnp_Amount');


    // const formattedAmount = amount ? (Number(amount) / 100).toLocaleString('vi-VN') : '';

    // const payDate = urlParams.get('vnp_PayDate');


    // let formattedDate = '';
    // if (payDate) {
    //     const year = parseInt(payDate.substring(0, 4), 10);
    //     const month = parseInt(payDate.substring(4, 6), 10);
    //     const day = parseInt(payDate.substring(6, 8), 10);
    //     const hour = parseInt(payDate.substring(8, 10), 10);
    //     const minute = parseInt(payDate.substring(10, 12), 10);
    //     const second = parseInt(payDate.substring(12, 14), 10);

    //     const formattedDateObj = new Date(year, month - 1, day, hour, minute, second);
    //     formattedDate = formattedDateObj.toLocaleDateString('vi-VN', {
    //         year: 'numeric',
    //         month: '2-digit',
    //         day: '2-digit',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //         second: '2-digit'
    //     });
    // }

    // const transCode = urlParams.get('vnp_BankTranNo');



    return (
        <div className="transaction-bill">
            <h2>Transaction Details</h2>
            {/* <div className="detail">
                <strong>Bank's Name:</strong> {bankName}
            </div>
            <div className="detail">
                <strong>Amount:</strong> {formattedAmount} VND
            </div>
            <div className="detail">
                <strong>Pay Date:</strong> {formattedDate}
            </div>
            <div className="detail">
                <strong>Transaction Code:</strong> {transCode}
            </div> */}
        </div>
    );
}

export default VnPayPayment;
