import React, { useEffect, useState } from "react";
import "./Navbar.css"; // Assuming you have a corresponding CSS file
import {
  Input,
  Space,
  Button,
  Select,
  Tag,
  Popover,
  Spin,
  Dropdown,
} from "antd";
import type { MenuProps } from "antd";
import Logo from "../../assets/image/logo.jpg";
import LogoDark from "https://art.art/wp-content/themes/art/new/img/logo_DotArt.svg";
import {
  LoadingOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Search } = Input;
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
      navigate("/home");
    }, 2000);
  };

  const items: MenuProps["items"] = [
    // {
    //   label: <div style={{ height: "10px" }}></div>,
    //   key: 0,
    // },
    {
      label: (
        <Link id="profile" className="dropdown-item" to={`/profile`}>
          <UserOutlined style={{ fontSize: "20px", marginRight: "5px" }} /> View
          Profile
        </Link>
      ),
      key: 1,
    },
    {
      label: (
        <Link id="profile" className="dropdown-item" to={`/cart`}>
          <ShoppingCartOutlined
            style={{ fontSize: "20px", marginRight: "5px" }}
          />{" "}
          View Cart
        </Link>
      ),
      key: 2,
    },
    {
      label: (
        <Link id="profile" className="dropdown-item" to={`/request/history`}>
          <SolutionOutlined style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
          Request History
        </Link>
      ),
      key: 3,
    },
    {
      label: (
        <Link id="profile" className="dropdown-item" to={`/forgot`}>
          <SyncOutlined style={{ fontSize: "20px", marginRight: "5px" }} />{" "}
          Change Password
        </Link>
      ),
      key: 4,
    },
    {
      type: "divider",
    },
    {
      label: isLoadingLogOut ? (
        <Spin
          style={{ marginRight: "5px", color: "#444950" }}
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        />
      ) : (
        <div id="logout" onClick={handleLogout}>
          <p>
            <LogoutOutlined /> Logout
          </p>
        </div>
      ),
      key: 5,
    },
  ];

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
      <div className="logo-container">
        <img
          id="logo"
          alt="logo"
          className="brand-title"
          src={Logo}
          onClick={() => {
            navigate("/home");
          }}
          style={{ cursor: "pointer" }}
        />
      </div>
      {(toggleMenu || screenWidth > 768) && (
        <nav className="navbar-links">
          <ul>
            <li>
              <Link
                id="upload"
                className="item"
                to="/upload"
                onClick={toggleNav}
              >
                {currentUser.role === 'artist'
                  ? <>UPLOAD NEW ARTWORK</>
                  : <>BECOME AN ARTIST</>
                }
              </Link>
            </li>
            <li>
              <Link
                id="request"
                className="item"
                to="/request"
                onClick={toggleNav}
              >
                VISUALIZE YOUR ART
              </Link>
            </li>
            <li>
              <Search
                placeholder="Search..."
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
                    to="/signup/email"
                    onClick={toggleNav}
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    id="project"
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
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space id="user-section">
                        <img
                          alt="avatar"
                          style={{
                            height: "30px",
                            borderRadius: "20px",
                            marginRight: "5px",
                          }}
                          src={currentUser.avatar}
                        />
                        {currentUser.nickname}
                      </Space>
                    </a>
                  </Dropdown>
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
