import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { Axios, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Avatar, Image } from 'antd';
import type { TableProps } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";

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

interface UserRequest {
    _id: string,
    name: string,
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
    user: User,
    artist: User,
    createdAt: string,
    updatedAt: string,
}

interface ArtistRequest {
    _id: string,
    artwork: Artwork,
    price: number,
    userRequest: UserRequest,
    status: boolean,
    createdAt: string,
    updatedAt: string,
}

export interface Data {
    artwork: Artwork,
    price: number,
    userRequest: UserRequest,
    createdAt: string,
    updatedAt: string
}

export default function ArtistResponse() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")
    const [artistRequestList, setArtistRequestList] = useState<ArtistRequest[]>([])

    const fetchArtistRequest = async () => {
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
                        res.data.map((item: UserRequest) => {
                            axios.get(`http://localhost:5000/artistRequests/userRequest/${item._id}`)
                                .then((res: AxiosResponse) => {
                                    setArtistRequestList([...artistRequestList, res.data])
                                })
                                .catch((err) => console.log(err))
                        })
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));

    };

    useEffect(() => {
        fetchArtistRequest()
    }, [])

    const deleteRequest = async () => {

    }

    const columns: TableProps<Data>['columns'] = [
        {
            title: 'Artist',
            dataIndex: 'userRequest',
            key: 'userRequest',
            render: (_, { userRequest }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Avatar src={userRequest.artist.avatar} alt='' size={50} />
                    <Text strong onClick={() => navigate(`../../artistList/${userRequest.artist._id}`)}>{userRequest.artist.nickname}</Text>
                </Flex>
            )
        },
        {
            title: 'Artwork',
            dataIndex: 'artwork',
            key: 'artwork',
            render: (_, { artwork }) => (
                <Flex justify='start' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Image src={artwork.imageUrl} alt='' />
                </Flex>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
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
        <Table columns={columns} dataSource={artistRequestList}
            pagination={{ defaultPageSize: 10, hideOnSinglePage: true }} />
    )
}
