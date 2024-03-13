import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { Flex, Button, Typography, Table, Image, Avatar, Space, Tooltip } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import dateFormat from '../../assistants/date.format';

interface User {
    _id: string;
    email: string;
    password: string;
    nickname: string;
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
    _id: string,
    user: User,
    artwork: Artwork,
    amount: number,
    code: String,
    status: boolean,
    createdAt: string,
    updatedAt: string,
}

export default function Order() {
    const { Text, Title } = Typography
    const navigate = useNavigate()
    const userToken = localStorage.getItem("USER")

    const [currentUser, setCurrentUser] = useState<User>()
    const [orderList, setOrderList] = useState<Order[]>([])

    const fetchOrderList = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken,
            },
        })
            .then((res) => {
                axios.get(`http://localhost:5000/users/${res.data.id}`)
                    .then((res) => {
                        console.log("Current user on order: ", res.data)
                        setCurrentUser(res.data)
                    })
                    .catch((err) => console.log(err))

                axios.get(`http://localhost:5000/orders/user/${res.data.id}`)
                    .then((res) => {
                        console.log("Order list: ", res.data)
                        setOrderList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        fetchOrderList()
    }, [])

    const columns: TableProps<Order>['columns'] = [
        {
            title: 'Transaction code',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            render: (_, { code }) => (
                <Flex justify='center' align='center' gap={10}>
                    <Text strong>{code}</Text>
                </Flex>
            )
        },
        {
            title: 'Artwork',
            dataIndex: 'artwork',
            key: 'artwork',
            align: 'center',
            render: (_, { artwork }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Image src={artwork.imageUrl} alt='' width={100} preview={false} />
                    <Text strong>{artwork.name}</Text>
                </Flex>
            )
        },
        {
            title: 'Total ($)',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            render: (_, { amount }) => (
                <Text strong>{amount}</Text>
            )
        },
        {
            title: 'Purchased',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_, { createdAt }) => (
                <Space size="middle">
                    <Flex vertical>
                        <Text strong>{moment(createdAt).fromNow()}</Text>
                        <Text style={{ fontSize: '80%' }} >{dateFormat(createdAt, 'HH:MM dd/mm/yyyy')}</Text>
                    </Flex>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, { _id }) => (
                <Space size="middle">

                </Space>
            ),
        },
        {
            title:
                <Tooltip title='Reload' overlayInnerStyle={{ backgroundColor: '#FFF', color: '#000' }}>
                    <Button onClick={() => fetchOrderList()} style={{ display: 'flex', alignItems: 'center' }}>
                        <ReloadOutlined />
                    </Button>
                </Tooltip>,
            width: '70px'
        }
    ]

    return (
        <>
            <Navbar onSubmit={() => { }} />
            <Flex vertical justify='center' align='center'>
                <Flex justify='center' align='center'>
                    <Title>ORDERS</Title>
                </Flex>
                {currentUser?.balance
                    ? <Flex gap={10} justify='center' align='center' style={{ margin: '0 5% 2% auto' }}>
                        <Text strong>Current balance: </Text>
                        <Text strong
                            style={{ backgroundColor: "green", padding: '2px 10px', borderRadius: '10px', color: '#FFF', fontSize: '150%' }}>
                            {currentUser.balance} $
                        </Text>
                    </Flex>
                    : null
                }

                <Table columns={columns} dataSource={orderList} bordered size='small' style={{ width: '90%' }}
                    pagination={{ defaultPageSize: 10, hideOnSinglePage: true, position: ["bottomCenter"] }}
                />
            </Flex>
        </>
    )
}
