import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Flex, Typography, message, Tabs, Badge } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import PendingRequest from './PendingRequest';
import ArtistResponse from './ArtistResponse';

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

export interface FormValues {
    name: string,
    description: string,
    priceEst: number,
    message: string,
}

export default function RequestHistory() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")
    const [loading, setLoading] = useState<boolean>(true);
    const [pendingRequestList, setPendingRequestList] = useState([])
    const [artistResponseList, setArtistResponseList] = useState([])

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

    const fetchArtistResponse = async () => {
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
                        setArtistResponseList(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchPendingRequest()
        fetchArtistResponse()
    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Pending requests',
            children: <PendingRequest />
        },
        {
            key: '2',
            label:
                <Badge dot={artistResponseList.length > 0}>
                    <Text>Artist's responses</Text>
                </Badge>,
            children: <ArtistResponse />
        },
    ]

    return (
        <>
            <Navbar onSubmit={() => { }} />
            {contextHolder}
            <Flex justify='center'>
                <Title style={{ fontFamily: 'monospace' }}>ARTWORK PERSONAL VISUALIZING REQUEST HISTORY</Title>
            </Flex>
            <Tabs defaultActiveKey='1' centered items={items}
                style={{ margin: '0 auto', width: '95%' }} />
        </>
    )
}
