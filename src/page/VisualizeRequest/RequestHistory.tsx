import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Tabs, Badge } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import RequestRequirements from './RequestRequirements';
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
    const [userRequestList, setUserRequestList] = useState([])
    const [artistRequestList, setArtistRequestList] = useState([])

    const fetchUserRequestHistory = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken,
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
        fetchUserRequestHistory()
    }, [])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Pending request',
            children: <PendingRequest />
        },
        {
            key: '2',
            label:
                <Badge dot={artistRequestList.length > 0}>
                    <Text>Responses</Text>
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
                style={{ margin: '0 auto', width: '90%' }} />
        </>
    )
}
