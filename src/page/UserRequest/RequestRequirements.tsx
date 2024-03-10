import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Image, Typography, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styles from './UserRequest.module.css'
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
    id: string;
    email: string;
    nickname: string;
    role: string;
    numOfFollower: number;
    avatar: string;
    password: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export default function RequestRequirements() {
    const navigate = useNavigate()
    const { Text, Title } = Typography
    const { id } = useParams()
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [image, setImage] = useState([]);
    const [artist, setArtist] = useState<User>({
        id: '',
        email: '',
        nickname: '',
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
            console.log("reponse: ", response);
            console.log(response.data);

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
                console.log("artist data: ", res.data)
                setArtist(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getNewPins();
        fetchArtistData();
    }, []);

    return (
        <>
            <Navbar onSubmit={onSearchSubmit} />
            <Flex justify='center' align='center' style={{ marginTop: '5%' }}>
                <Flex justify='space-evenly' align='start' gap={10}>
                    <Image src={artist.avatar} alt='' width={200} preview={false} style={{ borderRadius: '20px' }} />
                    <Text strong style={{ fontSize: '150%', minWidth: 'max-content' }}>{artist.nickname}</Text>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        id={styles.followButton}
                    >
                        <PlusCircleOutlined /> Follow
                    </Button>
                </Flex>
            </Flex>
        </>
    )
}
