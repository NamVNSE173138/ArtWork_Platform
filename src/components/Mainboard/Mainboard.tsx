import React, { useEffect, useState } from "react";
import { PinProps } from "./Pin";
// import "./Mainboard.css";
// import "./Pin.css";
import "./test.css";
import {
  Button,
  Divider,
  FloatButton,
  Skeleton,
  Watermark,
  message,
} from "antd";
import {
  DownloadOutlined,
  HeartFilled,
  PlusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { saveAs } from "file-saver";
import Box from "@mui/material/Box";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import LazyLoad from "react-lazyload";
import { addToCart } from "../../api/cart/cartAPI";

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
  // userNickname: string;
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
  // console.log(pins);
  const userToken = localStorage.getItem("USER");
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

  const [dataSource, setDataSource] = useState(pins.slice(0, 20));
  console.log(dataSource);

  const [hasMore, setHasMore] = useState(true);

  const getColumnCount = () => {
    const width = window.innerWidth;
    if (width >= 1920) {
      return 6; // Large screen (e.g., TV)
    } else if (width >= 1024) {
      return 5; // Desktop
    } else {
      return 2; // Mobile or smaller screens
    }
  };

  // Define the spacing based on device width
  const getSpacing = () => {
    const width = window.innerWidth;
    if (width >= 1920) {
      return 4; // Large screen (e.g., TV)
    } else if (width >= 1024) {
      return 3; // Desktop
    } else {
      return 2; // Mobile or smaller screens
    }
  };
  const [columnCount, setColumnCount] = useState(getColumnCount());
  const [spacing, setSpacing] = useState(getSpacing());
  useEffect(() => {
    fetchCurrentUserData();
    const handleResize = () => {
      setColumnCount(getColumnCount());
      setSpacing(getSpacing());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    console.log("Current user: ", currentUser);
  }, [currentUser]);
  const [shuffledPins, setShuffledPins] = useState<PinProps[]>([]);

  // Shuffle the array of pins when the component mounts
  useEffect(() => {
    const shuffled = [...pins].sort(() => Math.random() - 0.5);
    setShuffledPins(shuffled);
  }, [pins]);
  const fetchMoreData = () => {
    if (shuffledPins.length >= pins.length) {
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
        dataLength={shuffledPins.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p>loading ...</p>}
      >
        <Box sx={{ width: 1500, minHeight: 829, overflow: "hidden" }}>
          <Masonry columns={columnCount} spacing={spacing}>
            {shuffledPins.map((pin, index) => (
              <div className="Wrapper" key={index}>
                <LazyLoad once>
                  <img
                    src={pin.imageUrl}
                    alt={pin.name}
                    onClick={() => navigate(`/artwork/${pin._id}`)}
                    loading="lazy"
                    className="image"
                  />
                </LazyLoad>
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
