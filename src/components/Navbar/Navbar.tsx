import React, { useState } from "react";
import "./Navbar.css"; // Assuming you have a corresponding CSS file
import { Input, Space, Button, Select, Tag, Popover } from "antd";
import Logo from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";
import {
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

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
const Navbar: React.FC<NavbarProps> = ({ onSubmit }) => {
  let navigate = useNavigate();

  // const [startIndex, setStartIndex] = useState(0);
  // const [nextClickCount, setNextClickCount] = useState(0);
  // const responsiveTagCount = 3;
  const isLogin = localStorage.getItem("USER");
  console.log(isLogin);
  const handleLogout = () => {
    localStorage.removeItem("USER");
    navigate("/");
  };
  const onSearch = (value: string) => {
    console.log("Search value:", value);
    // Call the onSubmit prop passed from the parent component
    onSubmit(value);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSubmit(value);
  };
  return (
    <nav className="navbar">
      <div className="first-line">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
          <Input
            size="large"
            className="search-box"
            prefix={<SearchOutlined />}
            placeholder="Search "
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex" }}>
          <div className="user-actions">
            {!isLogin ? (
              <>
                <Link className="link-btn-nav" to={"/signin"}>
                  <Button className="btn-nav" size="large">
                    Sign In
                  </Button>
                </Link>
                <Link className="link-btn-nav" to={"/signup"}>
                  <Button className="btn-nav" size="large">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link className="link-btn-nav" to={"/profile"}>
                  <Button className="btn-nav" size="large">
                    <UserOutlined /> Profile
                  </Button>
                </Link>
                <Button
                  className="btn-nav link-btn-nav"
                  size="large"
                  onClick={handleLogout}
                >
                  <LogoutOutlined />
                  Log out
                </Button>
              </>
            )}
          </div>
          <Popover
            placement="bottomRight"
            // title={text}
            content={content}
            trigger="click"
          >
            <Button size="large" icon={<MenuOutlined />} />
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
