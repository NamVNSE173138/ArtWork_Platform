import { useEffect, useState } from "react";
import styles from "./Artwork.module.css";
import {
  List,
  Button,
  Avatar,
  Typography,
  Spin,
  Badge,
  Flex,
  message,
  Tag,
  Tooltip,
} from "antd";
import {
  LoadingOutlined,
  HeartFilled,
  DownloadOutlined,
  SendOutlined,
  PlusCircleOutlined,
  LikeOutlined,
  LikeFilled,
  HeartOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import nFormatter from "../../assistants/Formatter";
import { FormikProps, useFormik } from "formik";
import moment from "moment";
import ReportForm from "../../components/ReportForm/ReportForm";
import BuyArtwork from "../../components/BuyForm/BuyForm";
import Favorite from "../../components/Favorite/Favorite";
import * as Yup from "yup";
import { createFollower, deleteFollower } from "../../api/follow/followAPI";

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
  createdAt?: string;
  updatedAt?: string;
  nickname?: string;
  avatar?: string;
}

interface FavoriteList {
  user?: User;
  artwork?: Artwork;
  createAt?: string;
  updateAt?: string;
}

interface FollowList {
  _id: string;
  follower: User;
  following: Artwork;
  status: boolean;
}

export default function Artwork() {
  const { Text, Title } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const userToken = localStorage.getItem("USER");
  const [isLoading, setIsLoading] = useState(false);
  const [follows, setFollows] = useState<FollowList[]>([]);

  const onSearchSubmit = async (term: string) => {
    console.log(term);
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

  const [isLiked, setIsLiked] = useState(false);
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
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      text: Yup.string().required(),
    }),
    onSubmit: (values: Comment, { resetForm }) => {
      if (values.text.length > 0) {
        setNewCommentIncoming(true);
        axios
          .post(
            "http://localhost:5000/comments",
            {
              artwork: id,
              user: currentUser.id,
              text: values.text.trim(),
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
      } else {
        messageApi.open({
          type: "warning",
          content: "Comments should not be left empty !",
        });
        resetForm();
      }
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
        console.log("Artwork:", res.data);
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

  const getFollowingList = async (id: any) => {
    setIsLoading(true);
    if (currentUser.id) {
      await axios
        .get(`http://localhost:5000/follows/following/${id}`, {
          headers: {
            token: userToken,
          },
        })
        .then((res: any) => {
          setFollows(
            res.data.filter((item: any) => item.following === artwork.user)
          );
          setIsLoading(false);
        })
        .catch((err: any) => console.log(err));
    }
  };

  const fetchCommentListData = async () => {
    await axios
      .get(`http://localhost:5000/comments/artwork/${id}`)
      .then((res) => {
        console.log("Comment list: ", res.data);
        setCommentList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchFavoriteList = async () => {
    try {
      await axios
        .get("http://localhost:5000/artworks/getUserFavoriteList", {
          headers: {
            token: userToken,
          },
        })
        .then((res) => {
          console.log("Favorite List Response:", res.data.data);
          if (Array.isArray(res.data.data)) {
            const isArtworkLiked = res.data.data.some(
              (item: any) => item.artwork?._id === id
            );
            setIsLiked(isArtworkLiked);
          } else {
            console.error("Response data is not an array:", res.data.data);
          }
        });
    } catch (error: any) {
      console.error("Error fetching favorite list:", error.message);
      // Handle error
    }
  };

  const likeArtwork = async () => {
    try {
      if (!currentUser || !currentUser.id) {
        console.error("Current user data is not available");
        return;
      }

      // Make a POST request to likeArtwork API endpoint
      const response = await axios.post(
        `http://localhost:5000/artworks/favoriteList/${artwork._id}`,
        { user: currentUser.id },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        if (isLiked) {
          const updatedFavoriteList = favoriteList.filter(
            (item) => item.artwork?._id !== artwork._id
          );
          setFavoriteList(updatedFavoriteList);
        } else {
          setFavoriteList([...favoriteList, artwork]);
        }
        setIsLiked(!isLiked);
      }
    } catch (error: any) {
      console.error("Error liking artwork:", error.message);
      // Handle error
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
    fetchArtworkData();
    fetchFavoriteList();
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      getFollowingList(currentUser.id);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchCommentListData();
  }, [newCommentIncoming]);

  const handleFollow = () => {
    createFollower(artwork.user);
    setTimeout(() => {
      getFollowingList(currentUser.id);
    }, 500);
  };

  const handleUnfollow = () => {
    deleteFollower(follows[0]._id);
    setTimeout(() => {
      getFollowingList(currentUser.id);
    }, 500);
  };

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      {contextHolder}
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
              {artwork.price > 0 ? (
                <Badge.Ribbon
                  text={
                    <Text strong style={{ color: "#FFF" }}>
                      {artwork.price} $
                    </Text>
                  }
                  color="red"
                >
                  <img className={styles.image} src={artwork.imageUrl} alt="" />
                </Badge.Ribbon>
              ) : (
                <img className={styles.image} src={artwork.imageUrl} alt="" />
              )}
            </div>
            <div className={styles.rightSection}>
              <div className={styles.titleSection}>
                <Title style={{ minWidth: "fit-content", marginTop: "50px" }}>
                  {artwork.name}
                  <br />
                  <span id={styles.description}>
                    <Tooltip title={artwork.description} placement="topLeft">
                      <Text italic>Description: {artwork.description}</Text>
                    </Tooltip>
                  </span>
                  <div
                    style={{
                      marginTop: "-20px",
                    }}
                  >
                    {artwork.tags.map((tag, index) => (
                      <Tag key={index}>
                        <i>{tag}</i>
                      </Tag>
                    ))}
                  </div>
                </Title>
                <Text style={{ minWidth: "max-content" }}>
                  {artwork.createdAt
                    ? moment(artwork.createdAt).fromNow()
                    : null}
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
                      onClick={() => navigate(`/artistList/${artwork.user}`)}
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
                  icon={
                    follows.length > 0 ? (
                      <CheckCircleOutlined />
                    ) : (
                      <PlusCircleOutlined />
                    )
                  }
                  onClick={follows.length > 0 ? handleUnfollow : handleFollow}
                >
                  {follows.length > 0 ? "Following" : "Follow"}
                </Button>
              </div>
              <div className={styles.commentSection}>
                <div style={{ padding: "10px 0" }}>
                  <Text strong>
                    Comment &ensp;
                    <Badge
                      className="site-badge-count-109"
                      count={commentList.length}
                      showZero
                      style={{ backgroundColor: "#000000" }}
                    />
                  </Text>
                </div>
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
                            />
                          </span>
                          <div className={styles.commentInfo}>
                            <Flex
                              vertical
                              gap={6}
                              style={{ marginLeft: "8px" }}
                            >
                              <Flex
                                vertical
                                className={styles.commentText}
                                style={{ fontSize: "90%" }}
                              >
                                <Text
                                  strong
                                  id={styles.userName}
                                  onClick={() =>
                                    navigate(`/profile/${comment.user?.id}`)
                                  }
                                >
                                  {comment.user?.nickname}
                                </Text>
                                <Text
                                  style={{
                                    maxWidth: "fit-content",
                                    paddingRight: "5px",
                                  }}
                                >
                                  {comment.text}
                                </Text>
                              </Flex>
                              <Text
                                style={{
                                  fontSize: "70%",
                                  minWidth: "fit-content",
                                }}
                              >
                                {moment(comment.createdAt).fromNow()}
                              </Text>
                            </Flex>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  <div style={{ margin: "10px auto" }}>
                    <Text italic>
                      There is no comment on this yet. Start sharing your
                      thoughts on this.
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
                    value={commentForm.values.text.trimStart()}
                    placeholder="Say out your thought..."
                  />
                  <Button
                    type="primary"
                    htmlType="submit"
                    id={styles.submitButton}
                  >
                    <SendOutlined />
                  </Button>
                </form>
              </div>
              <div className={styles.buttonGroup}>
                <Button
                  size="large"
                  className="like-modal-btn"
                  // icon={<HeartFilled />}
                  icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
                  // icon={isLiked ? <HeartOutlined /> : <HeartFilled />}
                  onClick={likeArtwork}
                  // disabled={isLiked}
                />
                {artwork.price > 0 ? (
                  <BuyArtwork artwork={artwork._id} user={currentUser.id} />
                ) : (
                  <Button
                    size="large"
                    className="download-btn"
                    icon={<DownloadOutlined />}
                  >
                    Download
                  </Button>
                )}
                <Button className="share-btn" size="large">
                  Share
                </Button>
                <ReportForm artwork={artwork._id} user={currentUser.id} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
