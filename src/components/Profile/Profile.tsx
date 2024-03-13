import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Tabs,
  Modal,
  Form,
  Input,
  message,
  Badge,
  Typography,
  Flex,
} from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import "./Profile.css";
import Contributed from "../ContributedArtwork/ContributedArtwork";
import Favorite from "../Favorite/Favorite";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { Meta } = Card;
const { Text } = Typography;

interface User {
  id: string;
  email: string;
  nickname: string;
  role: string;
  bio: string;
  numOfFollower: number;
  avatar: string;
  password: string;
  status: boolean;
  createAt?: string;
  updateAt?: string;
}
interface FavoriteList {
  user?: {
    id: string;
    nickname: string;
    avatar: string;
  };
  artwork?: {
    _id: string;
    name: string;
    tags: string[];
    imageUrl: string;
    numOfLike: number;
    price: number;
    description: string;
    status: boolean;
  };
  createAt?: string;
  updateAt?: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const token = localStorage.getItem("USER");
  const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    setAvatarPreview(imageUrl);
    console.log("current img", imageUrl);
  };
  const fetchFavoriteList = async () => {
    await axios
      .get("http://localhost:5000/artworks/getUserFavoriteList", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        console.log("Favorite list data: ", res.data.data);
        setFavoriteList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedUser = {
        ...currentUser,
        ...values
      };

      await axios.patch(
        `http://localhost:5000/users/updateUserInfo`,
        {
          nickname: updatedUser.nickname,
          avatar: updatedUser.avatar,
          bio: updatedUser.bio
        },
        {
          headers: {
            token: token
          }
        }
      );

      message.success("Profile updated successfully");

      localStorage.removeItem("USER");

      navigate("/signin");
      // Update currentUser state with the updated information
      setCurrentUser(updatedUser);

      // Update avatarPreview if avatar URL is changed
      if (values.avatar !== currentUser.avatar) {
        setAvatarPreview(values.avatar);
        setCurrentUser(prevState => ({
          ...prevState,
          avatar: values.avatar
        }));
      }

      setEditModalVisible(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again later.");
    }
  };





  const userToken = localStorage.getItem("USER");

  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    bio: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
    createAt: "",
    updateAt: "",
  });

  const [requestList, setRequestList] = useState([]);
  const [artworks, setArtworks] = useState<any[]>([]);


  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user: ", res.data);
        setCurrentUser(res.data);

        if (res.data.role === "artist") {
          axios
            .get(`http://localhost:5000/userRequests/artist/${res.data.id}`)
            .then((res) => {
              console.log("Request list: ", res.data);
              setRequestList(res.data);
            })
            .catch((err) => console.log(err));
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/artworks/artworkOf/${currentUser.id}`
      );
      setArtworks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };
  useEffect(() => {
    fetchCurrentUserData();
    fetchFavoriteList();
    fetchArtworks();
  }, [currentUser.id]);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <Badge
          count={favoriteList.length}
          overflowCount={99}
          offset={[15, 0]}
          showZero
        >
          <Text>Favorite</Text>
        </Badge>
      ),
      children: <Favorite />,
    },
    {
      key: "2",
      label: (
        <Badge
          count={artworks.length}
          overflowCount={99}
          offset={[15, 0]}
          showZero
        >
          <Text>Contributed</Text>
        </Badge>
      ),
      children: <Contributed />,
    },
  ];
  return (
    <>
      <Navbar onSubmit={() => { }} />
      <div className="profile-container">
        <Row gutter={16}>
          <Col span={24}>
            <div className="profile-content">
              <Card
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Flex justify="center" align="center">
                  <Meta
                    avatar={<Avatar src={currentUser.avatar} />}
                    title={currentUser.nickname}
                    description={
                      <>
                        {currentUser.email} <br />
                        <i>{currentUser.bio}</i>
                      </>
                    }
                  />
                </Flex>

                <Flex>
                  <Button
                    size="large"
                    className="profile-btn"
                    icon={<EditOutlined />}
                    key="edit"
                    onClick={showEditModal}
                  >
                    Edit Profile
                  </Button>
                </Flex>
                {currentUser.role === "artist" ? (
                  <Badge dot={requestList.length > 0} offset={[-22, 25]}>
                    <Button
                      size="large"
                      className="profile-btn"
                      icon={<BuildOutlined />}
                      key="edit"
                      onClick={() => navigate("/profile/requests")}
                      style={{ border: "solid 1px" }}
                    >
                      Personal artwork visualizing requests
                    </Button>
                  </Badge>
                ) : null}
              </Card>
              <Modal
                title="Edit Profile"
                open={editModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
              >
                <Form layout="vertical" form={form}>
                  <Form.Item label="Full Name" name="nickname" initialValue={currentUser.nickname}>
                    <Input placeholder="Enter your full name" />
                  </Form.Item>
                  <Form.Item label="Avatar" name="avatar" initialValue={currentUser.avatar}>
                    <Input
                      placeholder="Enter avatar URL"
                      onChange={handleAvatarChange}
                    />
                    {avatarPreview && (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        style={{
                          display: "flex",
                          margin: "10px auto",
                          height: "150px",
                          width: "150px",
                          borderRadius: "50%",
                          textAlign: "center",
                        }}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Bio" name="bio" initialValue={currentUser.bio}>
                    <Input.TextArea placeholder="Enter your bio" />
                  </Form.Item>
                </Form>
              </Modal>

            </div>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              items={items}
              size="large"
              type="card"
              tabBarGutter={20}
              centered
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
