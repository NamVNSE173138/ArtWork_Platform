import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import ProfilePage from "../components/Profile/Profile";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface Pin {
  _id: string;
  artworkId: number;
  userId: number;
  artworkName: string;
  createTime: Date;
  tags: string;
  numOfLike: number;
  price: string;
  describe: string;
  urls: {
    regular: string;
  };
}
interface User {
  _id: string;
  email: string;
  password: string;
  nickName: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  status: boolean;
}
interface ArtworkResponse {
  data: Pin[];
}

const SignupForm: React.FC = () => {
  const userToken = localStorage.getItem("USER");
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async (term?: string) => {
    try {
      const response = await axios.get<ArtworkResponse>(
        `http://localhost:5000/artworks${term ? `?search=${term}` : ""}`
      );
      console.log(response);

      console.log("Data: ", response.data);

      if (!response.data) {
        console.log("No data available");
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      throw error;
    }
  };

  const onSearchSubmit = async (term: string) => {
    console.log("Search term from Navbar:", term);

    setLoading(true);

    try {
      const res = await getImages(term);

      const newPins = Array.isArray(res) ? res : [];

      newPins.sort(() => 0.5 - Math.random());
      setPins(newPins);
    } catch (error) {
      console.error("Error fetching search images:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNewPins = async () => {
    setLoading(true);

    try {
      const res = await getImages();

      const pinData = Array.isArray(res) ? res : [];

      setPins(pinData);
    } catch (error) {
      console.error("Error fetching new pins:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getNewPins();
    if (userToken) {
      console.log("Decoded token: ", userToken);
    } else {
      console.log("No token found");
    }
  }, []);

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      ) : (
        <ProfilePage />
      )}
    </>
  );
};

export default SignupForm;
