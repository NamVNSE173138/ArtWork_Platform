import { useEffect, useState } from "react";
import styles from "./Artwork.module.css";
import { List, Button, Avatar, Typography, Spin, Badge } from "antd";
import {
  LoadingOutlined,
  HeartFilled,
  DownloadOutlined,
  SendOutlined,
  PlusCircleOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';
import nFormatter from "../../assistants/Formatter";
import { FormikProps, Formik, useFormik } from "formik";
import moment from "moment";
import ReportForm from "../../components/ReportForm/ReportForm";
import Favorite from "../../components/Favorite/Favorite";
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

interface Comment {
  user?: User;
  text: string;
  numOfLike: number;
  createdAt?: string;
  updatedAt?: string;
  nickname?: string,
  avatar?: string,
}

interface FavoriteList {
  user?: User;
  artwork?: Artwork;
  createAt?: string;
  updateAt?: string;
}

export default function Artwork() {
  const { Text, Title } = Typography;
  const { id } = useParams();
  const userToken = localStorage.getItem("USER");
  const [isLoading, setIsLoading] = useState(false);

  const onSearchSubmit = async (term: string) => {
    console.log(term)
  };

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
    createdAt: "",
    updatedAt: "",
  });

  const [artwork, setArtwork] = useState<Artwork>({
    _id: "",
    user: {
      id: "",
      email: "",
      nickname: "",
      role: "",
      numOfFollower: 0,
      avatar: "",
      password: "",
      status: false,
      createdAt: "",
      updatedAt: "",
    },
    name: "",
    tags: [""],
    numOfLike: 0,
    price: 0,
    description: "",
    imageUrl: "",
    status: false,
    createdAt: "",
    updatedAt: "",
  });

  const [artist, setArtist] = useState<User>({
    id: "",
    email: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    password: "",
    status: false,
    createdAt: "",
    updatedAt: "",
  });


  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newCommentIncoming, setNewCommentIncoming] = useState(false);

  const [isLiked, setIsLiked] = useState(false); // State to track if artwork is liked
  const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);

  const commentForm: FormikProps<Comment> = useFormik<Comment>({
    initialValues: {
      user: {
        id: "",
        email: "",
        nickname: "",
        role: "",
        numOfFollower: 0,
        avatar: "",
        password: "",
        status: false,
        createdAt: "",
        updatedAt: "",
      },
      text: "",
      numOfLike: 0,
    },
    onSubmit: (values: Comment, { resetForm }) => {
      setNewCommentIncoming(true);
      axios
        .post(
          "http://localhost:5000/comments",
          {
            artwork: id,
            user: currentUser.id,
            text: values.text,
            numOfLike: 0,
          },
          {
            headers: {
              token: userToken,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
      resetForm();
      setTimeout(() => {
        setNewCommentIncoming(false);
      }, 500);
    },
  });

  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchArtworkData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/artworks/${id}`)
      .then((res: any) => {
        console.log("Artwork:", res.data)
        setArtwork(res.data);
        axios
          .get(`http://localhost:5000/users/${res.data.user}`)
          .then((res: any) => {
            setArtist(res.data);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const fetchCommentListData = async () => {
    await axios.get(`http://localhost:5000/comments/artwork/${id}`)
      .then((res) => {
        console.log("Comment list: ", res.data)
        setCommentList(res.data)
      })
      .catch((err) => console.log(err));
  };

  const likeArtwork = async () => {
    try {
      console.log("dfbnkdjbskdhbkh");
      console.log(localStorage.getItem("USER"));

      console.log("user", currentUser.id);
      if (!currentUser || !currentUser.id) {
        console.error('Current user data is not available');
        return;
      }
      // Make a POST request to likeArtwork API endpoint
      const response = await axios.post(
        `http://localhost:5000/artworks/favoriteList/${artwork._id}`, { user: currentUser.id },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log("Response:", response.data);
      if (response.status == 200) {
        console.log("favorite", response.data);
        setIsLiked(true); // Set isLiked state to true after successfully liking the artwork
        setFavoriteList([...favoriteList, artwork]); // Add artwork to favorite list
      }
    } catch (error: any) {
      console.error("Error liking artwork:", error.message);
      // Handle error
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
    fetchArtworkData();
  }, []);

  useEffect(() => {
    fetchCommentListData();
  }, [newCommentIncoming]);

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      <div className={styles.artworkContainer}>
        {isLoading ? (
          <Spin
            indicator={
              <LoadingOutlined style={{ fontSize: 80, color: "#000" }} spin />
            }
          />
        ) : (
          <>
            <div className={styles.leftSection}>
              <img className={styles.image} src={artwork.imageUrl} alt="" />
            </div>
            <div className={styles.rightSection}>
              <div className={styles.titleSection}>
                <Title style={{ minWidth: "fit-content" }}>
                  {artwork.name}
                </Title>
                <Text style={{ minWidth: "max-content" }}>
                  {moment(artwork.createdAt).fromNow()}
                </Text>
              </div>
              <div className={styles.artistSection}>
                <div className={styles.info}>
                  <img
                    src={artist.avatar}
                    alt="artist avatar"
                    className="avatar"
                  />
                  <span
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    <Text
                      strong
                      id={styles.userName}
                      onClick={() => navigate(`/profile/${artist.id}`)}
                      style={{ textDecoration: "underline" }}
                    >
                      {artist.nickname}
                    </Text>
                    <Text>
                      {nFormatter(artist.numOfFollower, 1)} Followers &ensp;
                    </Text>
                  </span>
                </div>
                <Button
                  type="primary"
                  shape="round"
                  size="large"
                  id={styles.followButton}
                >
                  <PlusCircleOutlined /> Follow
                </Button>
              </div>
              <div className={styles.commentSection}>
                {commentList.length > 0 ? (
                  <List
                    itemLayout="horizontal"
                    dataSource={[...commentList]}
                    loading={newCommentIncoming}
                    size="small"
                    renderItem={(comment: Comment) => (
                      <List.Item className={styles.singleComment}>
                        <div className={styles.singleCommentSection}>
                          <span style={{ minWidth: "max-content" }}>
                            <Avatar
                              src={comment.user?.avatar}
                              alt=""
                              size={45}
                              style={{ marginRight: "1%" }}
                            />
                          </span>
                          <div className={styles.commentInfo}>
                            <Text className={styles.commentText} style={{ fontSize: '90%' }}>
                              <Text
                                strong
                                id={styles.userName}
                                onClick={() =>
                                  navigate(`/profile/${comment.user?.id}`)
                                }
                              >
                                {comment.user?.nickname}
                              </Text>
                              &ensp;{comment.text}
                            </Text>
                            <Text className={styles.commentAction}>
                              <Text style={{ fontSize: '78%', minWidth: 'fit-content' }}>
                                {moment(comment.createdAt).fromNow()}
                              </Text>
                              <span className={styles.commentLikeButton}>
                                {comment.numOfLike > 0 ? <Text style={{ color: '#FFFFFF', fontSize: '90%' }}>{nFormatter(comment.numOfLike, 1)}</Text> : null}
                                <LikeOutlined />
                              </span>
                            </Text>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div style={{ margin: '10px auto' }}>
                    <Text italic>
                      There is no comment on this yet. Start sharing your thoughts on this.
                    </Text>
                  </div>
                )}
              </div>
              <div className={styles.commentTypeSection}>
                <span style={{ minWidth: "max-content" }}>
                  <Avatar
                    src={currentUser?.avatar}
                    alt=""
                    size={45}
                    style={{ marginRight: "2%" }}
                  />
                </span>
                <form onSubmit={commentForm.handleSubmit}>
                  <input
                    type="text"
                    id={styles.input}
                    name="text"
                    autoComplete="off"
                    onChange={commentForm.handleChange}
                    onBlur={commentForm.handleBlur}
                    value={commentForm.values.text}
                    placeholder="Say out your thought..."
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    id={styles.submitButton}
                    disabled={commentForm.values.text === ""}
                  >
                    <SendOutlined />
                  </Button>
                </form>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  size="large"
                  className="like-modal-btn"
                  icon={<HeartFilled />}
                  onClick={likeArtwork}
                  disabled={isLiked}
                />
                <Button
                  size="large"
                  className="download-btn"
                  icon={<DownloadOutlined />}
                >
                  Download
                </Button>
                <Button className="share-btn" size="large">
                  Share
                </Button>
                <ReportForm artwork={artwork._id} />
              </div>
            </div>
          </>
        )}
      </div >
    </>
  );
}
