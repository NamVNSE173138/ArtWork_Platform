// ProfilePage.tsx
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
} from "antd";
import {
  EditOutlined,
  CameraOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import "./Profile.css"; // Create this stylesheet for additional styling if needed
import Contributed from "../ContributedArtwork/ContributedArtwork";
import Favorite from "../Favorite/Favorite";
import { useParams } from "react-router-dom";
const { Meta } = Card;
const { Text } = Typography;
const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <Badge count={100} overflowCount={99} offset={[15, 0]} showZero>
        <Text>Favorited</Text>
      </Badge>
    ),
    children: <Favorite />,
  },
  {
    key: "2",
    label: (
      <Badge count={1} overflowCount={999} offset={[15, 0]} showZero>
        <Text>Contributed</Text>
      </Badge>
    ),
    children: <Contributed />,
  },
];

const ProfilePage: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { id } = useParams();
  console.log(id);

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
                title="User's nickname"
                description={
                  <>
                    Web Developer <br />
                    <i>sport</i>
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
                  icon={<EditOutlined />}
                  key="edit"
                  onClick={showEditModal}
                >
                  Edit Profile
                </Button>,
              ]}
            </Card>

            <Modal
              title="Edit Profile"
              open={editModalVisible}
              onOk={handleEditModalOk}
              onCancel={handleEditModalCancel}
            >
              {/* Add your form fields for editing profile data */}
              <Form layout="vertical">
                <Form.Item label="Full Name">
                  <Input placeholder="Enter your full name" />
                </Form.Item>
                <Form.Item label="Bio">
                  <Input.TextArea placeholder="Enter your bio" />
                </Form.Item>
                {/* Add more form fields as needed */}
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
  );
};

export default ProfilePage;
