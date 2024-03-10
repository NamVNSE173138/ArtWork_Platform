import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Avatar, Popconfirm } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import dateFormat from '../../assistants/date.format';
import { useFormik } from "formik";
import * as Yup from "yup";
import nFormatter from '../../assistants/Formatter';
import moment from 'moment';

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
    user: User,
    createdAt: string,
    updatedAt: string,
}

export default function UserRequestList() {
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
                axios.get(`http://localhost:5000/userRequests/artist/${res.data.id}`)
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
    }, [])

    const columns: TableProps<UserRequest>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            render: (_, { user }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Avatar src={user.avatar} alt='' size={50} />
                    <Text strong onClick={() => navigate(`../../artistList/${user._id}`)}>{user.nickname}</Text>
                </Flex>
            )
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Estimated price each ($)',
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
            title: 'Sent at',
            dataIndex: 'createdAt',
            key: 'createdAt',
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
            render: (_, { _id }) => (
                <Space size="middle">
                    <Button type='primary' style={{ display: 'flex', alignItems: 'center' }}
                        onClick={() => navigate(`/userRequest/approval/${_id}`)}>
                        Approve
                    </Button>
                    <Popconfirm
                        title="Recall this request ?"
                        // description="Are you sure to delete this task?"
                        icon={<DeleteOutlined style={{ color: 'red' }} />}
                        onConfirm={() => deleteRequest(_id)}
                    >
                        <Button type='primary' danger style={{ display: 'flex', alignItems: 'center' }}>
                            Deny
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
            scroll={{ y: 500, scrollToFirstRowOnChange: true }} />
    )
}
