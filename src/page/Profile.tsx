import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import ProfilePage from "../components/Profile/Profile";
import { useParams } from "react-router-dom";

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
  const userToken = localStorage.getItem("USER")
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getImages = async () => {
    try {
      const response = await axios.get<ArtworkResponse>(
        "http://localhost:5000/artworks "
      );
      console.log("Image:", response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      throw error; // Propagate the error
    }
  };

  const onSearchSubmit = async (term: string) => {
    setLoading(true);

    try {
      const res = await getImages();
      const newPins = Array.isArray(res.data)
        ? [...res.data, ...pins]
        : [...pins];

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
      const pinData = Array.isArray(res.data)
        ? res.data.sort(() => 0.5 - Math.random())
        : [];

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
      console.log("Decoded token: ", userToken)
    } else {
      console.log("No token found")
    }
  }, []);

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      <ProfilePage />
    </>
  );
};

export default SignupForm;
