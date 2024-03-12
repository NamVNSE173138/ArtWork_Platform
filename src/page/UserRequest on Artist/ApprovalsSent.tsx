import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Tooltip, Typography, Button, message, Table, Avatar, Popconfirm, Image } from 'antd';
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

export default function ApprovalsSent() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")
    const [artistRequestList, setArtistRequestList] = useState([])

    const fetchUserRequest = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken, //userToken = localStorage("USER")
            },
        })
            .then((res) => {
                console.log("Current user data: ", res.data)
                axios.get(`http://localhost:5000/artistRequests/artist/${res.data.id}`)
                    .then((res) => {
                        console.log("User request list: ", res.data)
                        setArtistRequestList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        fetchUserRequest()
    }, [])

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
            title: 'To user',
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
            title: 'Offered price ($)',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            render: (_, { price }) => (
                <Text strong>{price} $</Text>
            )
        },
        {
            title: 'Sent at',
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
                    <Popconfirm
                        title="Recall this request ?"
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteRequest(_id)}
                    >
                        <Button type='primary' danger style={{ display: 'flex', alignItems: 'center' }}>
                            Recall
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
        {
            title:
                <Tooltip title='Reload' overlayInnerStyle={{ backgroundColor: '#FFF', color: '#000' }}>
                    <Button onClick={() => fetchUserRequest()} style={{ display: 'flex', alignItems: 'center' }}>
                        <ReloadOutlined />
                    </Button>
                </Tooltip>,
            width: '70px'
        }
    ]

    const deleteRequest = async (id: string) => {
        await axios.get(`http://localhost:5000/artistRequests/${id}`)
            .then((res) => {
                console.log("User request id reverted: ", res.data.userRequest_id)
                axios.patch(`http://localhost:5000/userRequests/status/${res.data.userRequest._id}`, {
                    status: false,
                })
                    .then((res) => {
                        console.log(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
        await axios.delete(`http://localhost:5000/artistRequests/${id}`)
            .then((res) => {
                console.log("Delete request: ", res.data)
                setArtistRequestList(artistRequestList.filter((item: any) => item._id !== id))
                message.info("Request recalled.", 5)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            {contextHolder}
            < Table columns={columns} dataSource={artistRequestList}
                pagination={{ hideOnSinglePage: true }
                }
                scroll={{ y: 500, scrollToFirstRowOnChange: true }} />
        </>
    )
}
