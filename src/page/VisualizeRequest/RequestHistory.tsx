import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Tabs } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import RequestRequirements from './RequestRequirements';
import type { TabsProps } from 'antd';
import PendingRequest from './PendingRequest';
import ArtistResponse from './ArtistResponse';

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

export default function RequestHistory() {
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

    const getImages = async () => {
        try {
            const response = await axios.get<ArtworkResponse>(
                "http://localhost:5000/artworks"
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching artwork:", error);
            throw error;
        }
    };

    const getNewPins = async () => {
        setLoading(true);

        try {
            const res = await getImages();

            // Check if res.data is defined and is an array before sorting
            const pinData = Array.isArray(res.data) ? res.data : [];

            setPins(pinData);
        } catch (error) {
            console.error("Error fetching new pins:", error);
        } finally {
            setLoading(false);
        }
    };


    const onSearchSubmit = async (term: string) => {
        setLoading(true);

        try {
            const res = await getImages();
            const newPins = Array.isArray(res.data) ? res.data : [];

            newPins.sort(() => 0.5 - Math.random());
            setPins(newPins);
        } catch (error) {
            console.error("Error fetching search images:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNewPins();
    }, []);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Pending request',
            children: <PendingRequest />
        },
        {
            key: '2',
            label: 'Artist response',
            children: <ArtistResponse />
        },
    ]

    return (
        <>
            <Navbar onSubmit={onSearchSubmit} />
            {contextHolder}
            <Tabs defaultActiveKey='1' centered items={items}
                style={{ margin: '5% auto 0 auto', width: '90%' }} />
        </>
    )
}
