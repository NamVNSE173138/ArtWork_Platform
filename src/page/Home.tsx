import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Mainboard from "../components/Mainboard/Mainboard";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PinProps } from "../components/Mainboard/Pin";
import { log } from "console";

interface Pin {
  _id: string;
  user: string;
  name: string;
  tags: [string];
  numOfLike: number;
  price: number;
  description: string;
  imageUrl: string;
  createAt: Date;
  updatedAt: Date;
}

interface ArtworkResponse {
  data: Pin[];
}

const Home: React.FC = () => {
  const [pins, setPins] = useState<PinProps[]>([]);
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
  }, []);

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      ) : (
        <Mainboard pins={pins} />
      )}
    </>
  );
};

export default Home;
