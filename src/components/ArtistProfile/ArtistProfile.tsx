import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  message,
  List,
} from "antd";
import {
  EditOutlined,
  CameraOutlined,
  ShareAltOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./ArtistProfile.css"; // Create this stylesheet for additional styling if needed
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import LazyLoad from "react-lazyload";
import InfiniteScroll from "react-infinite-scroll-component";
import { createFollower, deleteFollower } from "../../api/follow/followAPI";

const { Meta } = Card;

const ArtistProfile: React.FC = () => {
  const { _id } = useParams();
  const userToken = localStorage.getItem("USER");
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState<any>(null);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [follows, setFollows] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({
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

  const handleShareProfile = () => {
    // Copy URL to clipboard
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success("Profile link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
        message.error("Failed to copy profile link!");
      });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${_id}`);
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/artworks/artworkOf/${_id}`
        );
        setArtworks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchUser();
    fetchArtworks();
  }, [_id]);
  console.log(artworks);

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

  const getFollowingList = async (id: any) => {
    setIsLoading(true);
    if (currentUser.id) {
      await axios
        .get(`http://localhost:5000/follows/following/${id}`, {
          headers: {
            token: userToken,
          },
        })
        .then((res) => {
          setFollows(res.data.filter((item: any) => item.following === _id));
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchCurrentUserData();
    getFollowingList(currentUser.id);
  }, [currentUser.id]);

  const handleFollow = () => {
    createFollower(_id);
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

  // const [artistArtwork, setArtistArtwork] = useState(artworks.slice(0, 30));
  // console.log(artistArtwork);

  // const [hasMore, setHasMore] = useState(true);
  // const fetchMoreData = () => {
  //   if (artistArtwork.length >= artworks.length) {
  //     setHasMore(false);
  //     return;
  //   }
  //   setTimeout(() => {
  //     setArtistArtwork(
  //       artistArtwork.concat(
  //         artworks.slice(artistArtwork.length, artistArtwork.length + 20)
  //       )
  //     );
  //   }, 1000);
  // };
  const navigate = useNavigate();
  return (
    <div className="profile-artist-container">
      <Row gutter={16}>
        <Col span={24}>
          <div className="profile-artist-content">
            <Card>
              <Meta
                avatar={<Avatar src={artist && artist.avatar} />}
                title={artist && artist.nickname}
                description={
                  <>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Follower: {artist && artist.numOfFollower}
                    </span>
                    <br />
                    <i>{artist && artist.bio}</i>
                  </>
                }
              />
              <Button
                size="large"
                className="profile-btn"
                icon={<ShareAltOutlined />}
                onClick={handleShareProfile}
              >
                Share Profile
              </Button>
              <Button
                size="large"
                className="profile-btn"
                icon={follows.length > 0 ? <CheckOutlined /> : <PlusOutlined />}
                onClick={follows.length > 0 ? handleUnfollow : handleFollow}
              >
                {follows.length > 0 ? "Following" : "Follow"}
              </Button>
            </Card>
          </div>
        </Col>
      </Row>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
        className="artwork-artist-list"
        itemLayout="vertical"
        size="large"
        pagination={{ pageSize: 6 }}
        dataSource={artworks}
        renderItem={(item: any) => (
          <List.Item key={item._id}>
            <Card style={{ width: "100%" }} actions={[]}>
              <img
                alt={item.name}
                src={item.imageUrl}
                className="list-image"
                onClick={() => navigate(`/artwork/${item._id}`)}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArtistProfile;
