import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { Flex, Result, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

interface User {
    _id: string;
    email: string;
    password: string;
    nickName: string;
    bio?: string;
    role: string;
    numOfFollower: number;
    avatar: string;
    status: boolean;
    balance?: number;
}

interface Artwork {
    _id: string;
    user: User;
    name: string;
    tags: [string];
    numOfLike: number;
    price: number;
    description: string;
    imageUrl: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface Order {
    user: User,
    amount: number,
    artwork: Artwork,
    code: String,
    createdAt: string,
    updatedAt: string,
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)

export default function OrderStatus() {
    const { Text, Title } = Typography
    const navigate = useNavigate()
    const amountString = urlParams.get("vnp_Amount")?.toString()
    const transaction = {
        amount: amountString?.slice(0, amountString.length - 2),
        code: urlParams.get("vnp_OrderInfo")?.split(':')[1],
    }

    const saveOrder = async () => {
        await axios.patch(`http://localhost:5000/orders/code/${transaction.code}`, {
            status: true,
        })
            .then((res) => {
                console.log("Order status update: ", res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        saveOrder()
    }, [])

    return (
        <>
            <Navbar onSubmit={() => { }} />
            <Result
                style={{ margin: '5% auto' }}
                status="success"
                title={`Successfully Purchased via VNPAY for ${transaction.amount?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND `}
                subTitle={
                    <Flex vertical justify='center' align='center'>
                        <Text>Artwork is saved in your contributed gallery. Click <Link to='/profile' >here</Link> to take a look at your new artwork.</Text>
                        <Text>Order code: {transaction.code}</Text>
                    </Flex>
                }
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate('/request/history')}>
                        Back
                    </Button>,
                    <Button key="buy" onClick={() => navigate('/order')}>Check my orders</Button>,
                ]}
            />
        </>
    )
}
