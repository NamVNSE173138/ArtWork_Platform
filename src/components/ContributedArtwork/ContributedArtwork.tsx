import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Spin,
  Alert,
  Button,
  message,
  Tag,
  Modal,
  Space,
} from "antd";
import {
  CalendarOutlined,
  DownloadOutlined,
  HeartFilled,
  PlusOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import "./ContributedArtwork.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Masonry from "@mui/lab/Masonry";
interface ImageData {
  id: string;
}

const handleAction = (action: string) => {
  switch (action) {
    case "Like":
      message.success("You liked the image!");
      // Implement your like functionality here
      break;
    case "Add":
      message.success("You added the image!");
      // Implement your add functionality here
      break;
    case "Download":
      message.success("Downloading image...");
      // Implement your download functionality here
      break;
    default:
      message.warning("Unknown action");
  }
};
interface User {
  id: string;
  email: string;
  nickname: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  password: string;
  status: boolean;
  createAt?: string;
  updateAt?: string;
}
const ContributedArtwork: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const userToken = localStorage.getItem("USER");
  const [isLoading, setIsLoading] = useState(false);
  const [artworks, setArtworks] = useState<any[]>([]);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
    createAt: "",
    updateAt: "",
  });
  const fetchCurrentUserData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://localhost:5000/users/getUserInfo`, {
        headers: {
          token: userToken, //userToken = localStorage("USER")
        },
      })
      .then((res) => {
        console.log("Current user: ", res.data);
        setCurrentUser(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const fetchArtworks = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/artworks/artworkOf/${id}`
      );
      setArtworks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };
  const generateImageObjects = () => {
    const imageObjects: ImageData[] = Array.from(
      { length: 10 },
      (_, index) => ({
        id: `image-${index + 1}`,
      })
    );
    setImages(imageObjects);
    setLoading(false);
  };
  useEffect(() => {
    if (currentUser.id) {
      fetchArtworks(currentUser.id);
    }
  }, [currentUser.id]);
  useEffect(() => {
    fetchCurrentUserData();
    generateImageObjects();
  }, [currentUser.id]);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message="Error fetching images" type="error" />;
  }

  return (
    <Masonry columns={6} spacing={2}>
      {artworks.map((item, index) => (
        <div key={index}>
          <img
            className="contributed-image"
            src={`${item.imageUrl}?w=162&auto=format`}
            alt={item.name}
            loading="lazy"
            style={{
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              display: "block",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/artwork/${item._id}`)}
          />
        </div>
      ))}
    </Masonry>
  );
};

export default ContributedArtwork;
