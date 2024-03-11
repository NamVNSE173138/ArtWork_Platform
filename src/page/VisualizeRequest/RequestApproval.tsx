import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Avatar, Card, List, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadImageForm from '../../components/UploadForm/UploadForm';
import e from 'express';
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

interface UserRequest {
    _id: string,
    name: string,
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
    artist: User,
    user: User,
    status: boolean,
    createdAt: string,
    updatedAt: string,
}

interface ArtistRequest {
    _id: string,
    artwork: Artwork,
    description: string,
    price: number,
    artist: User,
    user: any,
    status: boolean,
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
    const [loading, setLoading] = useState<boolean>(true);
    const [userRequest, setUserRequest] = useState<UserRequest>({
        _id: '',
        name: '',
        quantity: 0,
        description: '',
        priceEst: 0,
        message: '',
        artist: {
            _id: '',
            email: '',
            nickname: '',
            bio: '',
            role: '',
            numOfFollower: 0,
            avatar: '',
            password: '',
            status: false,
        },
        user: {
            _id: '',
            email: '',
            nickname: '',
            bio: '',
            role: '',
            numOfFollower: 0,
            avatar: '',
            password: '',
            status: false,
        },
        status: false,
        createdAt: '',
        updatedAt: '',
    })

    const [currentUser, setCurrentUser] = useState<any>({
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

    const [inputCardList, setInputCardList] = useState<any>([
        {
            key: 1
        }
    ])

    const addNewFormInput = () => {
        setInputCardList((current: any) => [...current, { key: current.key + 1 }])
    }

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

    const artistRequestForm = useFormik({
        initialValues: {
            artwork: {
                _id: "",
                user: userRequest.user,
                name: "",
                tags: [""],
                numOfLike: 0,
                price: 0,
                description: "",
                imageUrl: "",
                status: false,
                createdAt: "",
                updatedAt: "",
            },
            price: '',
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log("Form values: ", values)
            await axios.post(`http://localhost:5000/artworks`, {
                name: values.artwork.name,
                description: values.artwork.description,
                price: 0,
                numOfLike: 0,
                tags: [values.artwork.tags],
                imageUrl: values.artwork.imageUrl,
                user: userRequest.user._id,
                status: false,
            })
                .then((res) => {
                    console.log("Post artworkId: ", res.data._id)
                    axios.post(`http://localhost:5000/artistRequests`, {
                        artwork: res.data._id,
                        price: values.price,
                        userRequest: userRequest._id,
                        status: false,
                    })
                        .then((res) => {
                            console.log("Post artist request: ", res.data)
                        })
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        }
    })

    return (
        <>
            {contextHolder}
            <Navbar onSubmit={onSearchSubmit} />
            <Flex justify='space-around' align='center'>
                <Card size="default" title={<Text strong style={{ fontSize: '150%' }}>REQUIREMENTS</Text>} className={styles.requirementCard}>
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
                <Button style={{ display: 'flex', alignItems: 'center' }} onClick={addNewFormInput}>
                    Add new response <PlusCircleOutlined />
                </Button>
            </Flex>
            <List
                grid={{
                    gutter: 16,
                    column: 1,
                }}
                dataSource={inputCardList}
                style={{ marginTop: '2%' }}
                renderItem={(item: any) => (
                    <Card className={styles.inputCard} key={item.key}>
                        <form onSubmit={artistRequestForm.handleSubmit}>
                            <Flex gap={10}>
                                <Image src={artistRequestForm.values.artwork.imageUrl} alt='' placeholder={true} preview={false}
                                    style={{ minWidth: '200px', maxWidth: '300px' }} />
                                <Flex vertical>
                                    <input type='text' name='artwork.imageUrl' placeholder="Enter artwork's URL here"
                                        value={artistRequestForm.values.artwork.imageUrl}
                                        onChange={artistRequestForm.handleChange}
                                        onBlur={artistRequestForm.handleBlur}
                                    />
                                    <Flex vertical>
                                        <Text>Name of the artwork <strong style={{ color: 'red' }}>*</strong></Text>
                                        <input type='text' name='artwork.name' placeholder="Artwork's name"
                                            value={artistRequestForm.values.artwork.name}
                                            onChange={artistRequestForm.handleChange}
                                            onBlur={artistRequestForm.handleBlur}
                                        />
                                    </Flex>
                                    <Flex vertical>
                                        <Text>Description <strong style={{ color: 'red' }}>*</strong></Text>
                                        <input type='text' name='artwork.description' placeholder="Description"
                                            value={artistRequestForm.values.artwork.description}
                                            onChange={artistRequestForm.handleChange}
                                            onBlur={artistRequestForm.handleBlur}
                                        />
                                    </Flex>
                                    <Flex vertical>
                                        <Text>Tags <strong style={{ color: 'red' }}>*</strong></Text>
                                        <input type='text' name='artwork.tags' placeholder="Tags"
                                            value={artistRequestForm.values.artwork.tags}
                                            onChange={artistRequestForm.handleChange}
                                            onBlur={artistRequestForm.handleBlur}
                                        />
                                    </Flex>
                                    <Flex vertical>
                                        <Text>Price <strong style={{ color: 'red' }}>*</strong></Text>
                                        <input type='number' name='price' placeholder="Price"
                                            value={artistRequestForm.values.price}
                                            onChange={artistRequestForm.handleChange}
                                            onBlur={artistRequestForm.handleBlur}
                                        />
                                    </Flex>
                                    <Flex justify='center' align='center' gap={5} style={{ marginTop: '2%' }}>
                                        <button type='submit' className={styles.formButton} id={styles.submitButton}>
                                            <strong>SEND REQUEST</strong>
                                        </button>
                                        <button type='reset' className={styles.formButton} style={{ maxWidth: '30%' }}>
                                            <strong>RESET</strong>
                                        </button>
                                    </Flex>
                                </Flex>
                            </Flex>
                        </form>
                    </Card>
                )}
            />
        </>
    )
}
