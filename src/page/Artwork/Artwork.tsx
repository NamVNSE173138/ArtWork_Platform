import { useEffect, useState } from 'react'
import styles from "./Artwork.module.css"
import { List, Button, Avatar, Typography } from 'antd'
import { SafetyOutlined, HeartFilled, DownloadOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import nFormatter from '../../assistants/Formatter'

interface User {
    _id: string,
    email: string,
    nickname: string,
    role: string,
    numOfFollower: number,
    avatar: string,
    password: string,
    status: boolean,
    createAt: string,
    updateAt: string
}

interface Artwork {
    _id: string,
    user: User,
    name: string,
    tags: [string],
    numOfLike: number,
    price: number,
    description: string,
    imageUrl: string,
    status: boolean,
    createAt?: string,
    updateAt?: string,
}

interface Comment {
    user: string,
    text: string,
    numOfLike: number,
}

export default function Artwork() {
    const { Text, Title } = Typography
    const { id } = useParams()
    const navigate = useNavigate()
    const [artwork, setArtwork] = useState<Artwork>({
        _id: '',
        user: {
            _id: '',
            email: '',
            nickname: '',
            role: '',
            numOfFollower: 0,
            avatar: '',
            password: '',
            status: false,
            createAt: '',
            updateAt: '',
        },
        name: '',
        tags: [''],
        numOfLike: 0,
        price: 0,
        description: '',
        imageUrl: '',
        status: false,
        createAt: '',
        updateAt: '',
    })

    const [artist, setArtist] = useState<User>({
        _id: '',
        email: '',
        nickname: '',
        role: '',
        numOfFollower: 0,
        avatar: '',
        password: '',
        status: false,
        createAt: '',
        updateAt: '',
    })

    const [commentList, setCommentList] = useState<[Comment]>()

    const fetchArtworkData = async () => {
        await axios.get(`http://localhost:5000/artworks/${id}`)
            .then((res: any) => {
                console.log("Artwork data: ", res.data)
                setArtwork(res.data)
                axios.get(`http://localhost:5000/users/${res.data.user}`)
                    .then((res: any) => {
                        console.log("Artist: ", res.data)
                        setArtist(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    const fetchCommentList = async () => {
        await axios.get(`http://localhost:5000/comments/artwork/65b7d7d561e839c5836c00d8`)
            .then((res) => {
                setCommentList(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchArtworkData()
        fetchCommentList()
    }, [])

    return (
        <>
            <div className={styles.artworkContainer}>
                <div className={styles.leftSection}>
                    <img className={styles.image} src={artwork.imageUrl} alt="" />
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.titleSection}>
                        <Title>{artwork.name}</Title>
                        <Text>03/01/2024</Text>
                    </div>
                    <div className={styles.artistSection}>
                        <div className={styles.info}>
                            <img src="https://i.pinimg.com/564x/30/2f/d4/302fd4ae9a9786bf3b637f7cbe1ae7b6.jpg" alt="artist avatar" className="avatar" />
                            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                                <p className="name-modal">{artist.nickname}</p>
                                <p>{nFormatter(artist.numOfFollower, 1)} Followers</p>
                            </span>
                        </div>
                        <Button type="primary" shape="round" size="large">Follow</Button>
                    </div>
                    <div className={styles.commentSection}>
                        <div>
                            <List
                                itemLayout="horizontal"
                                dataSource={commentList}
                                size="small"
                                renderItem={(comment: Comment, index) => (
                                    <List.Item className={styles.singleComment}>
                                        <div>

                                        </div>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button size="large" className="like-modal-btn" icon={<HeartFilled />} />
                        <Button size="large" className="download-btn" icon={<DownloadOutlined />}>
                            Download
                        </Button>
                        <Button className="share-btn" size="large">
                            Share
                        </Button>
                        <Button className="report-btn" size="large">
                            Report
                        </Button>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2%' }}>
                        <SafetyOutlined /> Free to use under the ArtAttack License
                    </div>
                </div>
            </div>
        </>
    )
}
