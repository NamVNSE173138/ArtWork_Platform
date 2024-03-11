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
    key: "2",
    label: "Contributed Artwork",
    children: "Content of Tab Pane 2",
  },
];
const ArtistProfile: React.FC = () => {
  const { _id } = useParams();
  console.log(_id);

  const [artist, setArtist] = useState<any>(null);
  const [artworks, setArtworks] = useState<any[]>([]);

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
          `http://localhost:5000/artworks?user=${_id}`
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

  return (
    <div className="profile-container">
      <Row gutter={16}>
        <Col span={24}>
          <div className="profile-content">
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
                icon={<PlusOutlined />}
              >
                Follow Artist
              </Button>
            </Card>
          </div>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={24}>
          <Tabs defaultActiveKey="1" size="large" type="card">
            <Tabs.TabPane tab="Contributed Artwork" key="1">
              {artworks.map((artwork) => (
                <Card key={artwork._id}>
                  <Meta
                    title={artwork.title}
                    description={artwork.description}
                  />
                </Card>
              ))}
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistProfile;
