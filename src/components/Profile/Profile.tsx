// ProfilePage.tsx
import React, { useState } from "react";
import { Row, Col, Card, Avatar, Button, Tabs, Modal, Form, Input } from "antd";
import { EditOutlined, CameraOutlined } from "@ant-design/icons";
import type { TabsProps } from "antd";
import "./Profile.css"; // Create this stylesheet for additional styling if needed
import Contributed from "../ContributedArtwork/ContributedArtwork";
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
const ProfilePage: React.FC = () => {
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

  return (
    <div className="profile-container">
      <Row gutter={16}>
        <Col span={24}>
          <Card
            // cover={
            //   <img
            //     height={300}
            //     alt="Profile Cover"
            //     src="https://images.unsplash.com/photo-1705311756049-d4720db623f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
            //   />
            // }
            actions={[
              <Button
                icon={<EditOutlined />}
                key="edit"
                onClick={showEditModal}
              >
                Edit Profile
              </Button>,
              <Button icon={<CameraOutlined />} key="upload">
                Add to Story
              </Button>,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://plus.unsplash.com/premium_photo-1677101221533-52b45823a2dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0fGVufDB8fDB8fHww" />
              }
              title="Nam đẹp trai"
              description={
                <>
                  Web Developer <br />
                  Bố mày thích lập trình
                </>
              }
            />
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

export default ProfilePage;
