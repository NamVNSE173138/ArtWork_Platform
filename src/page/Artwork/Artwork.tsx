import { useEffect, useState } from 'react'
import styles from "./Artwork.module.css"
import { List, Button, Avatar, Typography, Input, Space } from 'antd'
import { SafetyOutlined, HeartFilled, DownloadOutlined, SendOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import nFormatter from '../../assistants/Formatter'
import { Field, Form, Formik, useFormik } from 'formik'
import moment from 'moment'
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
    const userToken = localStorage.getItem("USER")

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState<User>()
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

    const [commentList, setCommentList] = useState([])

    const fetchCurrentUserData = async () => {
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken //userToken = localStorage("USER")
            }
        })
            .then((res) => {
                setCurrentUser(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchArtworkData = async () => {
        await axios.get(`http://localhost:5000/artworks/${id}`)
            .then((res: any) => {
                setArtwork(res.data)
                axios.get(`http://localhost:5000/users/${res.data.user}`)
                    .then((res: any) => {
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
        fetchCurrentUserData()
        fetchArtworkData()
        fetchCommentList()
    }, [])

    const commentFormInitialValues: Comment = {
        user: '',
        text: '',
        numOfLike: 0,
    }

    const onCommentFormSubmit = (values: Comment) => {
        console.log("Values: ", values.text)
    }

    return (
        <>
            <div className={styles.artworkContainer}>
                <div className={styles.leftSection}>
                    <img className={styles.image} src={artwork.imageUrl} alt="" />
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.titleSection}>
                        <Title>{artwork.name}</Title>
                        <Text>{moment().startOf('hour').fromNow()}</Text>
                    </div>
                    <div className={styles.artistSection}>
                        <div className={styles.info}>
                            <img src="https://i.pinimg.com/564x/30/2f/d4/302fd4ae9a9786bf3b637f7cbe1ae7b6.jpg" alt="artist avatar" className="avatar" />
                            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                                <Text strong id={styles.userName}
                                    onClick={() => navigate(`/profile/${artist._id}`)}
                                    style={{ textDecoration: 'underline' }}>
                                    {artist.nickname}
                                </Text>
                                <p style={{ minWidth: 'fit-content' }}>{nFormatter(artist.numOfFollower, 1)} Followers</p>
                            </span>
                        </div>
                        <Button type="primary" shape="round" size="large" id={styles.followButton}><PlusCircleOutlined /> Follow</Button>
                    </div>
                    <div className={styles.commentSection}>
                        {(commentList.length > 0)
                            ?
                            <List
                                itemLayout="horizontal"
                                dataSource={commentList}
                                size="small"
                                renderItem={(comment: Comment, index) => (
                                    <List.Item className={styles.singleComment}>
                                        <div>
                                            <span style={{ minWidth: 'max-content' }}>
                                                <Avatar src="" alt='' size={45} style={{ marginRight: '1%' }} />
                                            </span>
                                            <div className={styles.commentInfo}>
                                                <Text>
                                                    <Text strong id={styles.userName} onClick={() => navigate(`/profile/${comment.user}`)}>{comment.user}</Text>
                                                    &ensp;{comment.text}
                                                </Text>
                                                <Text style={{ fontSize: '80%', alignSelf: 'flex-start' }}>{moment().startOf('hour').fromNow()}</Text>
                                            </div>
                                        </div>
                                    </List.Item>
                                )}
                            />
                            :
                            <div>
                                <Text>There is no comment on this yet. Start sharing your thoughts on this.</Text>
                            </div>
                        }
                    </div>
                    <div className={styles.commentTypeSection}>
                        <Formik
                            initialValues={commentFormInitialValues}
                            onSubmit={onCommentFormSubmit}
                        >
                            <div className={styles.formInput}>
                                <span style={{ minWidth: 'max-content' }}>
                                    <Avatar src={currentUser?.avatar} alt='' size={40} style={{ marginRight: '2%' }} />
                                </span>
                                <Space.Compact style={{ width: '100%' }}>
                                    <input type='text' id={styles.input} name="text"
                                        placeholder="Say out your thought..." />
                                    <input type='hidden' name='user' value={currentUser?._id} />
                                    <Button type="primary" htmlType="submit" id={styles.submitButton}>
                                        <SendOutlined />
                                    </Button>
                                </Space.Compact>
                            </div>
                        </Formik>
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
                </div>
            </div>
        </>
    )
}
