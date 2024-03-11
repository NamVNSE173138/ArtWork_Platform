import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button, message, Avatar } from 'antd';
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

export interface FormValues {
    name: string,
    quantity: number,
    description: string,
    priceEst: number,
    message: string,
}

export default function RequestRequirements() {
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
        getNewPins();
        fetchCurrentUserData();
        fetchArtistData();
    }, []);

    const defaultValues: FormValues = {
        name: "",
        quantity: 1,
        description: "",
        priceEst: 0,
        message: "",
    };

    const requestForm = useFormik({
        initialValues: defaultValues,
        validationSchema: Yup.object({
            name: Yup.string().required(""),
            quantity: Yup.number().integer("").min(1).max(50),
            description: Yup.string().required(""),
            priceEst: Yup.number().min(0.000001).required(""),
            message: Yup.string()
        }),
        validateOnBlur: false,
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: async (values: FormValues) => {
            console.log("Form values: ", values)
            await axios.post(`http://localhost:5000/userRequests`, {
                name: values.name,
                quantity: 1,
                description: values.description,
                priceEst: Math.round(values.priceEst * 100) / 100,
                message: values.message,
                user: currentUser.id,
                artist: artist._id,
                status: false,
            })
                .then((res: AxiosResponse) => {
                    console.log("Send request: ", res.data)
                    messageApi
                        .open({
                            type: 'loading',
                            content: 'Sending request...',
                            duration: 2,
                        })
                        .then(() => message.success('Your request is sent. Please stay tuned for responses from the artist', 5))
                    requestForm.resetForm()
                })
                .catch((err) => console.log(err))
        }
    })

    return (
        <>
            <Navbar onSubmit={onSearchSubmit} />
            {contextHolder}
            <form onSubmit={requestForm.handleSubmit} style={{ minWidth: '100%' }}>
                <Flex justify='center' align='center' className={styles.requestForm}>
                    <Flex justify='space-evenly' align='center' gap={20} style={{ width: '30%' }}>
                        <Flex vertical justify='center' align='center'>
                            <Flex justify='space-evenly' align='center' gap={20}>
                                <Avatar src={artist.avatar} alt='' />
                                <Text strong style={{ fontSize: '150%', minWidth: 'max-content' }} id={styles.artistName}
                                    onClick={() => { navigate(`../../artistList/${artist._id}`) }}>
                                    {artist.nickname}</Text>
                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    id={styles.followButton}
                                >
                                    <PlusCircleOutlined /> Follow
                                </Button>
                            </Flex>
                            <Text>{artist.bio}</Text>
                            <textarea name="message" rows={8} cols={8} wrap="soft" placeholder='Note to artist...' style={{ marginTop: '3%' }}
                                className={styles.messageInput}
                                value={requestForm.values.message}
                                onChange={requestForm.handleChange}
                                onBlur={requestForm.handleBlur}
                            />
                        </Flex>
                    </Flex>
                    <Flex style={{ width: '50%' }} justify='center' align='center' vertical>
                        <Title style={{ fontSize: '180%', fontWeight: '700' }}>Tell the artist about your art...</Title>

                        <Flex vertical style={{ width: '80%', margin: '0 auto' }} gap={10}>
                            <Text>Name of the artwork <strong style={{ color: 'red' }}>*</strong></Text>
                            <input className={styles.formInput} type='text' name='name' placeholder='What is it called ?' autoComplete='off'
                                value={requestForm.values.name}
                                onChange={requestForm.handleChange}
                                onBlur={requestForm.handleBlur}
                            />

                            <Text>Description <strong style={{ color: 'red' }}>*</strong></Text>
                            <textarea name='description' placeholder='Describe your art...' autoComplete='off'
                                className={styles.messageInput}
                                value={requestForm.values.description}
                                onChange={requestForm.handleChange}
                                onBlur={requestForm.handleBlur}
                            />

                            <Flex align='center' justify='space-between' gap={5}>
                                <Flex vertical>
                                    <Text>Quantity <strong style={{ color: 'red' }}>*</strong></Text>
                                    <input className={styles.formNumberInput} type='number' name='quantity'
                                        value={requestForm.values.quantity}
                                        onChange={requestForm.handleChange}
                                        onBlur={requestForm.handleBlur}
                                    />
                                </Flex>

                                <Flex vertical>
                                    <Text>Estimated price each ($) <strong style={{ color: 'red' }}>*</strong></Text>
                                    <input className={styles.formNumberInput} type='number' name='priceEst'
                                        value={requestForm.values.priceEst}
                                        onChange={requestForm.handleChange}
                                        onBlur={requestForm.handleBlur}
                                    />
                                </Flex>
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
                </Flex >
            </form>
        </>
    )
}
