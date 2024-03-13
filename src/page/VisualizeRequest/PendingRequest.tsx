import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Avatar, Popconfirm, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from 'moment';
import dateFormat from '../../assistants/date.format';

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
    const [pendingRequestList, setPendingRequestList] = useState([])

    const fetchPendingRequest = async () => {
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
                        setPendingRequestList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        fetchPendingRequest()
    }, [])

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
            title: 'Estimated price ($)',
            dataIndex: 'priceEst',
            key: 'priceEst',
            align: 'center',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: 'center',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            align: 'center',
        },
        {
            title: 'Sent',
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
        {
            title:
                <Tooltip title='Reload' overlayInnerStyle={{ backgroundColor: '#FFF', color: '#000' }}>
                    <Button onClick={() => fetchPendingRequest()} style={{ display: 'flex', alignItems: 'center' }}>
                        <ReloadOutlined />
                    </Button>
                </Tooltip>,
            width: '70px'
        }
    ]

    const deleteRequest = async (id: string) => {
        await axios.delete(`http://localhost:5000/userRequests/${id}`)
            .then((res) => {
                console.log("Delete request: ", res.data)
                setPendingRequestList(pendingRequestList.filter((item: any) => item._id !== id))
                message.info("Request recalled.", 5)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            {contextHolder}
            <Table columns={columns} dataSource={pendingRequestList}
                pagination={{ hideOnSinglePage: true }}
                scroll={{ y: 500 }} />
        </>
    )
}
