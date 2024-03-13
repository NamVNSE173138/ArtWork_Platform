import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, Tooltip, message, Table, Avatar, Popconfirm, Image } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import dateFormat from '../../assistants/date.format';
import moment from 'moment';

interface User {
    _id: string,
    email: string,
    nickname: string,
    bio: string,
    role: string,
    numOfFollower: number,
    avatar: string,
    password: string,
    status: boolean,
    createdAt?: string,
    updatedAt?: string,
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

interface UserRequest {
    _id: string,
    name: string,
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
    artist: User,
    user: User,
    createdAt: string,
    updatedAt: string,
}

interface ArtistRequest {
    _id: string,
    artwork: Artwork,
    price: number,
    artist: User,
    user: User,
    userRequest: UserRequest,
    createdAt: string,
    updatedAt: string,
}

export default function PurchasedOrders() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const [currentUser, setCurrentUser] = useState<any>({})
    const [purchasedOrderList, setPurchasedOrderList] = useState([])

    const userToken = localStorage.getItem("USER")
    const fetchPurchasedOrderList = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken, //userToken = localStorage("USER")
            },
        })
            .then((res) => {
                axios.get(`http://localhost:5000/users/${res.data.id}`)
                    .then((res) => {
                        console.log("Current user data fetched: ", res.data)
                        console.log("Balance: ", res.data.balance)
                        setCurrentUser(res.data)
                        axios.get(`http://localhost:5000/artistRequests/artist/purchased/${res.data._id}`)
                            .then((res) => {
                                setPurchasedOrderList(res.data)
                            })
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        fetchPurchasedOrderList()
    }, [])

    const handleEarn = async (id: string) => {
        messageApi
            .open({
                type: 'loading',
                content: '',
                duration: 1,
            })
            .then(async () => {
                await axios.get(`http://localhost:5000/artistRequests/${id}`)
                    .then((res) => {
                        axios.patch(`http://localhost:5000/users/${currentUser._id}`, {
                            balance: (currentUser.balance > 0) ? (currentUser.balance + res.data.price) : res.data.price
                        })
                            .then((res) => {
                                console.log("Update user's balance: ", res.data)
                            })
                            .catch((err) => console.log(err))
                        message.success(`You have earned ${res.data.price} $. Double-check your balance !`, 5)

                    })
                    .catch((err) => console.log(err))

                await axios.delete(`http://localhost:5000/artistRequests/${id}`)
                    .then((res) => {
                        console.log("Deleted artist request: ", res.data)
                        fetchPurchasedOrderList()
                    })
                    .catch((err) => console.log(err))
            })
    }

    const columns: TableProps<ArtistRequest>['columns'] = [
        {
            title: 'Artwork',
            dataIndex: 'artwork',
            key: 'artwork',
            align: 'center',
            render: (_, { artwork }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Image src={artwork.imageUrl} alt='' width={100} />
                    <Text strong>{artwork.name}</Text>
                </Flex>
            )
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            align: 'center',
            render: (_, { user }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Avatar src={user.avatar} alt='' size={50} />
                    <Text strong onClick={() => navigate(`../../artistList/${user._id}`)}>{user.nickname}</Text>
                </Flex>
            )
        },
        {
            title: 'Earned ($)',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (_, { price }) => (
                <Text strong
                    style={{ backgroundColor: '#2382EC', padding: '2% 5%', borderRadius: '10px', color: '#FFF' }}>
                    {price} $
                </Text>
            )
        },
        {
            title: 'Purchased',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            align: 'center',
            render: (_, { updatedAt }) => (
                <Space size="middle">
                    <Flex vertical>
                        <Text strong>{moment(updatedAt).fromNow()}</Text>
                        <Text style={{ fontSize: '80%' }} >{dateFormat(updatedAt, 'HH:MM dd/mm/yyyy')}</Text>
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
                    <Button type='primary' onClick={() => handleEarn(_id)} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#24B60D' }}>
                        <strong>EARN</strong>
                    </Button>
                </Space>
            ),
        },
        {
            title:
                <Tooltip title='Reload' overlayInnerStyle={{ backgroundColor: '#FFF', color: '#000' }}>
                    <Button onClick={() => fetchPurchasedOrderList()} style={{ display: 'flex', alignItems: 'center' }}>
                        <ReloadOutlined />
                    </Button>
                </Tooltip>,
            width: '70px'
        }
    ]

    const deleteRequest = async (id: string) => {

    }

    return (
        <>
            {contextHolder}
            < Table columns={columns} dataSource={purchasedOrderList}
                pagination={{ hideOnSinglePage: true }
                }
                scroll={{ y: 500, scrollToFirstRowOnChange: true }} />
        </>
    )
}
