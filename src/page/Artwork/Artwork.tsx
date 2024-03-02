import { useEffect, useState } from 'react'
import styles from "./Artwork.module.css"
import { List, Button, Avatar, Typography, Spin, Space } from 'antd'
import { LoadingOutlined, HeartFilled, DownloadOutlined, SendOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import nFormatter from '../../assistants/Formatter'
import { FormikProps, Formik, useFormik } from 'formik'
import moment from 'moment'
interface User {
    id: string,
    email: string,
    nickname: string,
    role: string,
    numOfFollower: number,
    avatar: string,
    password: string,
    status: boolean,
    createAt?: string,
    updateAt?: string
}

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
  createAt?: string;
  updateAt?: string;
}

interface Comment {
    user?: string,
    text: string,
    numOfLike: number,
    createAt?: string,
    updateAt?: string,
}

export default function Artwork() {
    const { Text, Title } = Typography
    const { id } = useParams()
    const userToken = localStorage.getItem("USER")
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState<User>({
        id: "",
        email: "",
        password: "",
        nickname: "",
        role: "",
        numOfFollower: 0,
        avatar: "",
        status: false,
        createAt: "",
        updateAt: ""
    })
    const [artwork, setArtwork] = useState<Artwork>({
        _id: '',
        user: {
            id: '',
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
        id: '',
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

    const [commentList, setCommentList] = useState<Comment[]>([])
    const [newCommentIncoming, setNewCommentIncoming] = useState(false)

    const fetchCurrentUserData = async () => {
        setIsLoading(true)
        await axios.get(`http://localhost:5000/users/getUserInfo`, {
            headers: {
                token: userToken //userToken = localStorage("USER")
            }
        })
            .then((res) => {
                console.log("Current user: ", res.data)
                setCurrentUser(res.data)
                setIsLoading(false)
            })
            .catch((err) => console.log(err))
    }

    const fetchArtworkData = async () => {
        setIsLoading(true)
        await axios.get(`http://localhost:5000/artworks/${id}`)
            .then((res: any) => {
                setArtwork(res.data)
                axios.get(`http://localhost:5000/users/${res.data.user}`)
                    .then((res: any) => {
                        setArtist(res.data)
                        setIsLoading(false)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    const fetchCommentList = async () => {
        await axios.get(`http://localhost:5000/comments/artwork/${id}`)
            .then((res) => {
                setCommentList(res.data)
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchCurrentUserData()
        fetchArtworkData()
    }, [])

    useEffect(() => {
        fetchCommentList()
    }, [newCommentIncoming])

    const commentForm: FormikProps<Comment> = useFormik<Comment>({
        initialValues: {
            user: '',
            text: '',
            numOfLike: 0,
        },
        onSubmit: (values: Comment, { resetForm }) => {
            setNewCommentIncoming(true)
            axios.post('http://localhost:5000/comments',
                {
                    artwork: id,
                    user: currentUser.id,
                    text: values.text,
                    numOfLike: 0
                },
                {
                    headers: {
                        token: userToken
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setIsLoading(false)
                })
                .catch((err) => console.log(err))
            resetForm();
            setTimeout(() => {
                setNewCommentIncoming(false)
            }, 500)
        }
    })

    return (
        <>
            <div className={styles.artworkContainer}>
                {isLoading
                    ?
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 80, color: '#000' }} spin />} />
                    :
                    <>
                        <div className={styles.leftSection}>
                            <img className={styles.image} src={artwork.imageUrl} alt="" />
                        </div>
                        <div className={styles.rightSection}>
                            <div className={styles.titleSection}>
                                <Title style={{ minWidth: 'fit-content' }}>{artwork.name}</Title>
                                <Text style={{ minWidth: 'max-content' }}>{moment().startOf('hour').fromNow()}</Text>
                            </div>
                            <div className={styles.artistSection}>
                                <div className={styles.info}>
                                    <img src={artist.avatar} alt="artist avatar" className="avatar" />
                                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                                        <Text strong id={styles.userName}
                                            onClick={() => navigate(`/profile/${artist.id}`)}
                                            style={{ textDecoration: 'underline' }}>
                                            {artist.nickname}
                                        </Text>
                                        <Text>{nFormatter(artist.numOfFollower, 1)} Followers &ensp;</Text>
                                    </span>
                                </div>
                                <Button type="primary" shape="round" size="large" id={styles.followButton}><PlusCircleOutlined /> Follow</Button>
                            </div>
                            <div className={styles.commentSection}>
                                {(commentList.length > 0)
                                    ?
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={[...commentList]}
                                        loading={newCommentIncoming}
                                        className={styles.commentListContainer}
                                        size="small"
                                        renderItem={(comment: Comment) => (
                                            <List.Item className={styles.singleComment}>
                                                <div>
                                                    <span style={{ minWidth: 'max-content' }}>
                                                        <Avatar src={comment.user} alt='' size={45} style={{ marginRight: '1%' }} />
                                                    </span>
                                                    <div className={styles.commentInfo}>
                                                        <Text className={styles.commentText}>
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
                                <span style={{ minWidth: 'max-content' }}>
                                    <Avatar src={currentUser?.avatar} alt='' size={45} style={{ marginRight: '2%' }} />
                                </span>
                                <form onSubmit={commentForm.handleSubmit}>
                                    <input type='text' id={styles.input} name="text" autoComplete='off'
                                        onChange={commentForm.handleChange}
                                        onBlur={commentForm.handleBlur}
                                        value={commentForm.values.text}
                                        placeholder="Say out your thought..." />
                                    <Button type="primary" htmlType="submit" id={styles.submitButton} disabled={commentForm.values.text === ''}>
                                        <SendOutlined />
                                    </Button>
                                </form>
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
                    </>
                }
            </div>
        </>
    )
}
