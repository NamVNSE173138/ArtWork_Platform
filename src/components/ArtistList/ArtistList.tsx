import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, Card, List, Space } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  PlusCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "./ArtistList.css";

const ArtistList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:5000/users?role=user")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log fetched data to see its structure
        setUserData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <List
      className="artist-list"
      itemLayout="vertical"
      size="large"
      pagination={{ pageSize: 3 }}
      dataSource={userData}
      renderItem={(item: any) => (
        <List.Item key={item._id}>
          <Card style={{ width: "100%" }} actions={[]}>
            <Card.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <div className="nickname">
                  <Link to={`/artistList/${item._id}`}>{item.nickname}</Link>
                </div>
              }
              description={<div>{item.numOfFollower}</div>}
            />
            <div className="artist-action">
              <Button className="btn-fl" icon={<PlusCircleOutlined />}>
                Follow
              </Button>
              <Button className="btn-fl">Request to make artwork</Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ArtistList;
