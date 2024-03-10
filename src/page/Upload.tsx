// Home.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Flex, Image } from "antd";
import UploadImageForm from "../components/UploadForm/UploadForm";
import axios from "axios";

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
  imageUrl: string;
}

interface ArtworkResponse {
  data: Pin[];
}

const Upload: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/artworks")
      .then((response) => response.json())
      .then((res) => {
        setImage(res);
      });
  }, []);

  const getImages = async () => {
    try {
      const response = await axios.get<ArtworkResponse>(
        "http://localhost:5000/artworks"
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      throw error;
    }
  };

  const onSearchSubmit = async (term: string) => {
    setLoading(true);

    try {
      const res = await getImages();
      const newPins = Array.isArray(res.data) ? res.data : [];

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

      // Check if res.data is defined and is an array before sorting
      const pinData = Array.isArray(res.data) ? res.data : [];

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
  useEffect(() => { }, [pins]);
  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      <Flex align="center" justify="center" style={{ marginTop: '6%' }} gap={10}>
        <h2>SHARE YOUR ART TO PEOPLE</h2>
        <Image src="https://i.pinimg.com/originals/7c/43/0b/7c430ba6fb3cd7058aec52cb84a080e6.png" alt="" width={70} preview={false} />
      </Flex>
      <UploadImageForm />
    </>
  );
};

export default Upload;
