//---------------------------------------------------------------------------------- main

import React, { useEffect, useState } from "react";
import { Spin, Alert, Button } from "antd";
import { DownloadOutlined, HeartFilled, PlusOutlined } from "@ant-design/icons";
import "./Favorite.css";
import axios from "axios";
import Masonry from "@mui/lab/Masonry";
import { useNavigate } from "react-router-dom";

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

const Favorite: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavoriteList = async () => {
      try {
        const token = localStorage.getItem("USER");
        const response = await axios.get(
          "http://localhost:5000/artworks/getUserFavoriteList",
          {
            headers: {
              token: token,
            },
          }
        );
        setFavoriteList(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite list:", error);
        setError("Error fetching favorite list");
        setLoading(false);
      }
    };
    fetchFavoriteList();
  }, []);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <Masonry columns={6} spacing={2}>
      {favoriteList.map((favorite, index) => (
        <div key={index}>
          <img
            className="favorite-image"
            src={`${favorite.artwork?.imageUrl}?w=162&auto=format`}
            alt={""}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: "block",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/artwork/${favorite.artwork?._id}`)}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default Favorite;
