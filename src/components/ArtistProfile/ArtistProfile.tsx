// ArtistProfile.tsx
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
} from "antd";
import {
  EditOutlined,
  CameraOutlined,
  ShareAltOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import "./ArtistProfile.css"; // Create this stylesheet for additional styling if needed
import Contributed from "../ContributedArtwork/ContributedArtwork";
import { useParams } from "react-router-dom";
import axios from "axios";
const { Meta } = Card;
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Favourite Artwork",
    children: <Contributed />,
  },
  {
    key: "2",
    label: "Contributed Artwork",
    children: "Content of Tab Pane 2",
  },
];
const ArtistProfile: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditModalOk = () => {
    // Handle logic for saving edited profile data
    setEditModalVisible(false);
  };
  const isLogin = localStorage.getItem("USER");

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
  const { _id } = useParams();
  const [artist, setArtist] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${_id}`);
        console.log(response);

        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, [_id]);

  //   useEffect(() => {
  //     fetch(`http://localhost:5000/users/${_id}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setArtist(data);
  //         console.log(data);
  //       });
  //   }, []);
  return (
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
              <Meta
                avatar={
                  <Avatar src="https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fHww" />
                }
                title={artist && artist.nickname}
                description={
                  <>
                    <b
                      style={{
                        display: "block",
                        fontSize: "16px",
                      }}
                    >
                      Follower:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {artist && artist.numOfFollower}
                      </span>
                    </b>

                    <i>{artist && artist.bio}</i>
                  </>
                }
              />
              {[
                <Button
                  size="large"
                  className="profile-btn"
                  icon={<ShareAltOutlined />}
                  key="upload"
                  onClick={handleShareProfile}
                >
                  Share Profile
                </Button>,
                <Button
                  size="large"
                  className="profile-btn"
                  icon={<PlusOutlined />}
                  key="edit"
                  //   onClick={showEditModal}
                >
                  Follow Artist
                </Button>,
              ]}
            </Card>

            {/* <Modal
              title="Edit Profile"
              open={editModalVisible}
              onOk={handleEditModalOk}
              onCancel={handleEditModalCancel}
            >
              <Form layout="vertical">
                <Form.Item label="Full Name">
                  <Input placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item label="Bio">
                  <Input.TextArea placeholder="Enter your bio" />
                </Form.Item>
              </Form>
            </Modal> */}
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" items={items} size="large" type="card" />
        </Col>
      </Row>
    </div>
  );
};

export default ArtistProfile;
