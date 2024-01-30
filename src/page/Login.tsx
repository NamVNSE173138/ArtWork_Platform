import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import Login from "../components/Login/Login";

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
interface ArtworkResponse {
  data: Pin[];
}

const LoginForm: React.FC = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = async () => {
    try {
      const response = await axios.get<ArtworkResponse>(
        "http://localhost:5000/artwork"
      );

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
  }, []);

  return (
    <>
      <Navbar onSubmit={onSearchSubmit} />
      <Login />
    </>
  );
};

export default LoginForm;
