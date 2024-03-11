import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Artist from "../../components/UserRequest/ArtistList";
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
  imageUrl: string;
}

interface ArtworkResponse {
  data: Pin[];
}

const ArtistList: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/artworks")
      .then((response) => response.json())
      .then((res) => {
        setImage(res);
        // console.log(res);
      });
  }, []);
  // console.log(image);

  const getImages = async () => {
    try {
      const response = await axios.get<ArtworkResponse>(
        "http://localhost:5000/artworks"
      );
<<<<<<< HEAD:src/page/UserRequest/ArtistList.tsx
      console.log("reponse: ", response);
      // console.log(response.data);
=======
      console.log("response: ", response);
      console.log(response.data);
>>>>>>> 1604d2b450ea2a3fd3f849b35a98bb84754870bb:src/page/VisualizeRequest/ArtistList.tsx

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

  useEffect(() => {}, [pins]);
  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      <Artist />
    </>
  );
};

export default ArtistList;
