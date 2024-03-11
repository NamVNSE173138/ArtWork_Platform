import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Tabs } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import type { TabsProps } from 'antd';
import UserRequestList from '../../components/Profile/UserRequestList';

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

export interface FormValues {
    name: string,
    description: string,
    priceEst: number,
    message: string,
}

export default function UserRequestOnArtist() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")

    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState([]);
    const [artist, setArtist] = useState<User>({
        _id: '',
        email: '',
        nickname: '',
        bio: '',
        role: '',
        numOfFollower: 0,
        avatar: '',
        password: '',
        status: false,
    })

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Pending request',
            children: <UserRequestList />
        },
        {
            key: '2',
            label: 'Approvals sent',
            children: "Approvals sent"
        },
    ]

    return (
        <>
            <Navbar onSubmit={() => { }} />
            {contextHolder}
            <Flex vertical justify='center' align='center'>
                <Title style={{ fontFamily: '"Kanit", sans-serif', paddingBottom: '1%' }}>PERSONAL ARTWORK VISUALIZING REQUEST</Title>
                <Tabs defaultActiveKey='1' centered items={items} />
            </Flex>
        </>
    )
}
