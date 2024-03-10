import React, { useEffect, useState } from "react";
import { PinProps } from "./Pin";
// import "./Mainboard.css";
// import "./Pin.css";
import "./test.css";
import { Button, Divider, FloatButton, Skeleton, message } from "antd";
import { DownloadOutlined, HeartFilled, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { saveAs } from "file-saver";
import Box from "@mui/material/Box";
import Masonry from '@mui/lab/Masonry';
import axios from "axios";

interface MainboardProps {
  pins: PinProps[];
}
interface DataType {
  _id: string;
  user: string;
  name: string;
  tags: string;
  numOfLike: number;
  price: number;
  description: string;
  imageUrl: string;
  userNickname: string;
  createAt: Date;
  updatedAt: Date;
}
interface User {
  id: string;
  email: string;
  nickname: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  password: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface FavoriteList {
  user?: User;
  artwork?: Artwork;
  createAt?: string;
  updateAt?: string;
}

interface Artwork {
  _id: string;
  user: User;
  name: string;
  tags: [string];
  numOfLike: number;
  price: number;
  description: string;
  imageUrl: string;
  status: boolean;
  createdAt?: string;
  updatedAt?: string;
}
const Mainboard: React.FC<MainboardProps> = ({ pins }) => {
  const navigate = useNavigate();
  const [modalIndex, setModalIndex] = useState(-1);
  // console.log(pins);
  const userToken = localStorage.getItem("USER");
  const [isLiked, setIsLiked] = useState(false); // State to track if artwork is liked
  const [favoriteList, setFavoriteList] = useState<FavoriteList[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState<User>({
    id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
    createdAt: "",
    updatedAt: "",
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
  useEffect(() => {
    fetchCurrentUserData();
  }, []);
  useEffect(() => {
    console.log("Current user: ", currentUser);
  }, [currentUser]);

  const [artwork, setArtwork] = useState<Artwork>({
    _id: "",
    user: {
      id: "",
      email: "",
      nickname: "",
      role: "",
      numOfFollower: 0,
      avatar: "",
      password: "",
      status: false,
      createdAt: "",
      updatedAt: "",
    },
    name: "",
    tags: [""],
    numOfLike: 0,
    price: 0,
    description: "",
    imageUrl: "",
    status: false,
    createdAt: "",
    updatedAt: "",
  });
  const likeArtwork = async (pinId: string) => {
    try {
      console.log("dfbnkdjbskdhbkh");
      console.log(localStorage.getItem("USER"));

      console.log("user", currentUser.id);
      if (!currentUser || !currentUser.id) {
        console.error("Current user data is not available");
        return;
      }
      const response = await axios.post(
        `http://localhost:5000/artworks/favoriteList/${pinId}`,
        { user: currentUser.id },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      console.log("Response:", response.data);
      if (response.status == 200) {
        console.log("favorite", response.data);
        setIsLiked(true);
        setFavoriteList([
          ...favoriteList,
          { user: response.data.currentUser, artwork: response.data.artwork },
        ]);
      }
    } catch (error: any) {
      console.error("Error liking artwork:", error.message);
      // Handle error
    }
  };

  const handleAdd = () => {
    message.success("Added!");
  };

  const handleDownload = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    pin: PinProps
  ) => {
    const imageUrl = pin.imageUrl;
    const name = pin.name;
    message.success("Downloading...");
    console.log(imageUrl, " ", name);
    saveAs(imageUrl, `${name}.png`);
  };

  const handleShare = () => {
    message.success("Share functionality goes here");
  };

  const handleReport = () => {
    message.success("Report functionality goes here");
  };

  const [dataSource, setDataSource] = useState(pins.slice(0, 20));
  console.log(dataSource);

  const [hasMore, setHasMore] = useState(true);
  const fetchMoreData = () => {
    if (dataSource.length >= pins.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setDataSource(
        dataSource.concat(pins.slice(dataSource.length, dataSource.length + 20))
      );
    }, 1000);
  };

  return (
    <div className="mainboard_wrapper">
      <InfiniteScroll
        dataLength={dataSource.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>loading ...</p>}
      >
        {/* <div className="mainboard_container">
          {dataSource.map((pin, index) => (
            <div className="Wrapper" key={index}>
              <div className="image">
                <div className="top-btn">
                  <Button
                    size="large"
                    className="like-btn"
                    icon={<HeartFilled />}
                    onClick={() => likeArtwork(pin._id)}
                    disabled={isLiked}
                  />
                  <Button
                    size="large"
                    className="add-btn"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                  />
                </div>
                <div className="bottom-btn">
                  <Button
                    size="large"
                    className="download-btn"
                    icon={<DownloadOutlined />}
                    onClick={(event) => handleDownload(event, pin)}
                  />
                </div>
                <div className="artist-info">
                  <img
                    src="https://i.pinimg.com/564x/30/2f/d4/302fd4ae9a9786bf3b637f7cbe1ae7b6.jpg"
                    alt="artist avatar"
                    className="avatar"
                  />
                  <div className="info">
                    <p className="name">{pin.userNickname}</p>
                  </div>
                </div>
                <img
                  src={pin.imageUrl}
                  alt="pin"
                  onClick={() => navigate(`/artwork/${pin._id}`)}
                />
              </div>
            </div>
          ))}
          </div> */}
        <Box sx={{ width: 1500, minHeight: 829, overflow: "hidden" }}>
          <Masonry columns={5} spacing={2}>
            {dataSource.map((pin, index) => (
              <div className="Wrapper" key={index}>
                <div className="top-btn">
                  <Button
                    size="large"
                    className="like-btn"
                    icon={<HeartFilled />}
                    onClick={() => likeArtwork(pin._id)}
                    disabled={isLiked}
                  />
                  <Button
                    size="large"
                    className="add-btn"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                  />
                </div>
                <div className="bottom-btn">
                  <Button
                    size="large"
                    className="download-btn"
                    icon={<DownloadOutlined />}
                    onClick={(event) => handleDownload(event, pin)}
                  />
                </div>
                <div
                  className="artist-info"
                // style={{ position: "absolute", bottom: "10px", left: "10px" }}
                >
                  <img
                    src="https://i.pinimg.com/564x/30/2f/d4/302fd4ae9a9786bf3b637f7cbe1ae7b6.jpg"
                    alt="artist avatar"
                    className="avatar"
                  />
                  <div className="info">
                    <p className="name">{pin.userNickname}</p>
                  </div>
                </div>
                <img
                  // srcSet={`${pin.imageUrl}?w=162&auto=format&dpr=2 2x`}
                  src={pin.imageUrl}
                  alt={pin.name}
                  onClick={() => navigate(`/artwork/${pin._id}`)}
                  loading="lazy"
                  // style={{
                  //   display: "block",
                  //   width: "100%",
                  //   cursor: "pointer",
                  //   position: "relative",
                  // }}
                  className="image"
                />
              </div>
            ))}
          </Masonry>
        </Box>
      </InfiniteScroll>
      <FloatButton.BackTop />
    </div>
  );
};

export default Mainboard;
