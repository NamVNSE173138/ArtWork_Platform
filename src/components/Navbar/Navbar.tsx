import React, { useEffect, useState } from "react";
import "./Navbar.css"; // Assuming you have a corresponding CSS file
import { Input, Space, Button, Select, Tag, Popover, Spin } from "antd";
import Logo from "../../assets/image/logo.jpg";
import LogoDark from "https://art.art/wp-content/themes/art/new/img/logo_DotArt.svg";
import {
  LoadingOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Search } = Input;
const { Option } = Select;
const text = <span>Title</span>;

const content = (
  <div className="menu" style={{ display: "flex" }}>
    {/* Company Column */}
    <div className="menu-part">
      <p>Company</p>
      <ul>
        <li style={{ listStyleType: "none" }}>Who We Are?</li>
        <li>Join the Team</li>
        <li>Blog</li>
        <li>Contact Us</li>
        <li>Help Center</li>
      </ul>
    </div>

    {/* Community Column */}
    <div className="menu-part">
      <p>Community</p>
      <ul>
        <li>Become an Artist</li>
        <li>Collections</li>
        <li>Trends</li>
        <li>Statistics</li>
      </ul>
    </div>

    {/* Product Column */}
    <div className="menu-part">
      <p>Product</p>
      <ul>
        <li>Pictures</li>
        <li>Backgrounds</li>
        <li>Wallpapers</li>
      </ul>
    </div>
  </div>
);

const tags = [
  "Minimalism",
  "Wallpapers",
  "3D Renders",
  "Nature",
  "Architecture & Interiors",
  // ... other tags
];
interface NavbarProps {
  onSubmit: (term: string) => void; // Define the type for the onSubmit prop
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
  createAt?: string;
  updateAt?: string;
}
const Navbar: React.FC<NavbarProps> = ({ onSubmit }) => {
  let navigate = useNavigate();
  const userToken = localStorage.getItem("USER");
  console.log(userToken);
  const [isLoadingLogOut, setIsLoadingLogOut] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);
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
    createAt: "",
    updateAt: "",
  });

  const handleLogout = () => {
    setIsLoadingLogOut(true);

    setTimeout(() => {
      localStorage.removeItem("USER");
      setIsLoadingLogOut(false);
      navigate("/signin");
    }, 2000);
  };

  const onSearch = (value: string) => {
    console.log("Search value:", value);
    // Call the onSubmit prop passed from the parent component
    onSubmit(value);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSubmit(value);
  };

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

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
  return (
    <div className="navbar-home">
      <div className="title">
        <div className="title-title">
          <img alt="logo" className="brand-title" src={Logo} />
        </div>
        <MenuOutlined className="toggle-burger" onClick={toggleNav} />
      </div>
      {(toggleMenu || screenWidth > 768) && (
        <nav className="navbar-links">
          <ul>
            <li>
              <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{ width: 600 }}
              />
            </li>
            {!userToken ? (
              <>
                <li>
                  <Link
                    id="signup"
                    className="item"
                    to="/signup"
                    onClick={toggleNav}
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    id="projet"
                    className="item"
                    to="/signin"
                    onClick={toggleNav}
                  >
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    id="profile"
                    className="item"
                    to={`/profile/${currentUser.id}`}
                    onClick={toggleNav}
                  >
                    {currentUser.nickname}
                  </Link>
                </li>
                <li>
                  <div
                    id="projet"
                    className="item"
                    // to="/signin"
                    onClick={() => {
                      toggleNav();
                      handleLogout();
                    }}
                  >
                    {isLoadingLogOut ? (
                      <Spin
                        style={{ marginRight: "5px", color: "#444950" }}
                        indicator={
                          <LoadingOutlined style={{ fontSize: 24 }} spin />
                        }
                      />
                    ) : (
                      <LogoutOutlined />
                    )}{" "}
                    Log Out
                  </div>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
