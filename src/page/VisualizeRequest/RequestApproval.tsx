import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Avatar, Card } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadImageForm from '../../components/UploadForm/UploadForm';
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

export interface UserRequest {
    _id: string,
    name: string,
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
    artist: User | {},
    user: User | {},
    createdAt: string,
    updatedAt: string,
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
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
}

export default function RequestApproval() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const [messageApi, contextHolder] = message.useMessage()

    const userToken = localStorage.getItem("USER")
    const { id } = useParams()
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState([]);
    const [userRequest, setUserRequest] = useState<UserRequest>({
        _id: '',
        name: '',
        quantity: 0,
        description: '',
        priceEst: 0,
        message: '',
        artist: {},
        user: {},
        createdAt: '',
        updatedAt: '',
    })

    const [currentUser, setCurrentUser] = useState({
        id: '',
        email: '',
        nickname: '',
        bio: '',
        role: '',
        numOfFollower: 0,
        avatar: '',
        password: '',
        status: false,
    })

    const onSearchSubmit = () => {

    };

    const fetchCurrentUserData = async () => {
        await axios
            .get(`http://localhost:5000/users/getUserInfo`, {
                headers: {
                    token: userToken, //userToken = localStorage("USER")
                },
            })
            .then((res) => {
                console.log("Current user data: ", res.data)
                setCurrentUser(res.data);
            })
            .catch((err) => console.log(err));
    };

    const fetchUserRequestData = async () => {
        await axios.get(`http://localhost:5000/userRequests/${id}`)
            .then((res: AxiosResponse) => {
                console.log("User request data: ", res.data)
                setUserRequest(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchCurrentUserData();
        fetchUserRequestData();
    }, []);

    return (
        <>
            {contextHolder}
            <Navbar onSubmit={onSearchSubmit} />
            <Card size="default" title={<Text strong>REQUIREMENTS</Text>} className={styles.requirementCard}>
                <Flex vertical justify='center' align='center' gap={10} className={styles.requirementSection}>
                    <Flex justify='center' align='center' gap={10}>
                        <Text strong>Name:</Text>
                        <Text italic>{userRequest.name}</Text>
                    </Flex>
                    <Flex justify='center' align='center' gap={10}>
                        <Text strong>Description:</Text>
                        <Text italic>{userRequest.description}</Text>
                    </Flex>
                    <Flex justify='center' align='center' gap={10}>
                        <Text strong mark>Message:</Text>
                        <Text italic mark>{userRequest.message}</Text>
                    </Flex>
                    <Flex justify='center' align='center' gap={10}>
                        <Text strong code>Quantity:</Text>
                        <Text italic code>{userRequest.quantity}</Text>
                    </Flex>
                </Flex>
            </Card>
            <UploadImageForm />
        </>
    )
}
