import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Avatar } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
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

export interface Data {
    name: string,
    description: string,
    priceEst: number,
    message: string,
    artist: User,
    createdAt?: string
}

export default function ArtistResponse() {
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
    }, [])

    const deleteRequest = async () => {

    }

    const columns: TableProps<Data>['columns'] = [
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
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Estimated price',
            dataIndex: 'priceEst',
            key: 'priceEst',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type='primary' danger onClick={deleteRequest}
                        style={{ display: 'flex', alignItems: 'center' }}

                    >
                        Recall
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <Table columns={columns} dataSource={userRequestList}
            pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} />
    )
}
