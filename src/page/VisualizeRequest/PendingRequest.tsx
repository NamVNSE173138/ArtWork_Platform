import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Avatar, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";

interface Pin {
    _id: string;
    artworkId: number;
    userId: number;
    artworkName: string;
    createTime: Date;
    tags: string;
    numOfLike: number;
    price: string;
    describe: string;
    imageUrl: string;
}

interface ArtworkResponse {
    data: Pin[];
}

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

export interface UserRequest {
    _id: string,
    name: string,
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
    artist: User,
    createdAt?: string,
    updatedAt?: string,
}

export default function PendingRequest() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")
    const [userRequestList, setUserRequestList] = useState([])

    const fetchUserRequest = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken, //userToken = localStorage("USER")
            },
        })
            .then((res) => {
                console.log("Current user data: ", res.data)
                axios.get(`http://localhost:5000/userRequests/user/${res.data.id}`)
                    .then((res) => {
                        console.log("User request list: ", res.data)
                        setUserRequestList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        fetchUserRequest()
    }, [userRequestList])

    const columns: TableProps<UserRequest>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            render: (_, { artist }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Avatar src={artist.avatar} alt='' size={50} />
                    <Text strong onClick={() => navigate(`../../artistList/${artist._id}`)}>{artist.nickname}</Text>
                </Flex>
            )
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Estimated price',
            dataIndex: 'priceEst',
            key: 'priceEst',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, { _id }) => (
                <Space size="middle">
                    <Popconfirm
                        title="Recall this request ?"
                        // description="Are you sure to delete this task?"
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
    ]

    const deleteRequest = async (id: string) => {
        await axios.delete(`http://localhost:5000/userRequests/${id}`)
            .then((res) => {
                console.log("Delete request: ", res.data)
                setUserRequestList(userRequestList.filter((item: any) => item._id !== id))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Table columns={columns} dataSource={userRequestList}
            pagination={{ hideOnSinglePage: true }}
            scroll={{ y: 500 }} />
    )
}
