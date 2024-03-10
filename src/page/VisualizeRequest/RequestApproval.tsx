import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Avatar } from 'antd';
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

    const fetchArtistData = async () => {
        await axios.get(`http://localhost:5000/users/${id}`)
            .then((res: AxiosResponse) => {
                console.log("Artist data: ", res.data)
                setArtist(res.data)
            })
            .catch((err) => console.log(err))
    }

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

    useEffect(() => {
        fetchCurrentUserData();
        fetchArtistData();
    }, []);

    return (
        <>
            <Navbar onSubmit={onSearchSubmit} />
            {contextHolder}
            <UploadImageForm />
        </>
    )
}
