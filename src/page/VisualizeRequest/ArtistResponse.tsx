import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { Axios, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Space, Typography, Button, message, Table, Avatar, Image, Modal, Tooltip } from 'antd';
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
    user: User,
    artist: User,
    status: boolean,
    createdAt: string,
    updatedAt: string,
}

export default function ArtistResponse() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                axios.get(`http://localhost:5000/artistRequests/user/${res.data.id}`)
                    .then((res: AxiosResponse) => {
                        console.log("Artist request list: ", res.data)
                        setArtistRequestList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchArtistRequest()
    }, [])

    const onGet = () => {

    }

    const rejectRequest = async () => {

    }

    const columns: TableProps<ArtistRequest>['columns'] = [
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            align: 'center',
            render: (_, { artist }) => (
                <Flex justify='center' align='center' gap={10} style={{ cursor: 'pointer' }}>
                    <Avatar src={artist.avatar} alt='' size={50} />
                    <Text strong onClick={() => navigate(`../../artistList/${artist._id}`)}>{artist.nickname}</Text>
                </Flex>
            )
        },
        {
            title: 'Artwork',
            dataIndex: 'artwork',
            key: 'artwork',
            align: 'center',
            render: (_, { artwork }) => (
                <>
                    <Flex justify='center' align='center' gap={10} style={{ cursor: 'pointer' }}>
                        <Image src={artwork.imageUrl} alt='' width={300} style={{ borderRadius: '30px' }} />
                    </Flex>
                    <Modal title={<Text strong id={styles.modalArtworkName}>{artwork.name}</Text>} open={isModalOpen} closeIcon={false}
                        footer={[
                            <Button key="Close" onClick={() => setIsModalOpen(false)}>
                                Close
                            </Button>
                        ]}>
                        <Flex justify='center' align='start' gap={10}>
                            <Image src={artwork.imageUrl} alt='' width={300} style={{ borderRadius: '30px' }} />
                        </Flex>
                    </Modal>
                </>
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (_, { artwork }) => (
                <Text strong>{artwork.name}</Text>
            )
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            align: 'center',
            render: (_, { artwork }) => (
                <Space size="middle">
                    <Tooltip trigger='click' style={{ backgroundColor: '#FFF' }} title={
                        <Flex vertical>
                            <Text><strong>Tags: </strong> {artwork.tags}</Text>
                            <Text><strong>Description: </strong> {artwork.description}</Text>
                        </Flex>
                    } overlayInnerStyle={{ backgroundColor: '#FFF' }}>
                        <Button type='default' style={{ display: 'flex', alignItems: 'center' }}>
                            Details
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            width: '100px',
            render: () => (
                <Flex justify='center' align='center' gap={5}>
                    <Button type='primary' onClick={onGet}
                        style={{ display: 'flex', alignItems: 'center', backgroundColor: 'green' }}
                    >
                        <strong>ACCEPT</strong>
                    </Button>
                    <Button type='primary' danger onClick={rejectRequest}
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <strong>REJECT</strong>
                    </Button>
                </Flex>
            ),
        },
    ]

    return (
        <Table columns={columns} dataSource={artistRequestList} bordered size='small'
            pagination={{ defaultPageSize: 10, hideOnSinglePage: true, position: ["bottomCenter"] }} />
    )
}
