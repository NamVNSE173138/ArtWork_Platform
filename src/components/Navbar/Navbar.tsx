import React, { useState } from "react";
import "./Navbar.css"; // Assuming you have a corresponding CSS file
import { Input, Space, Button, Select, Tag, Popover } from "antd";
import Logo from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
  const [startIndex, setStartIndex] = useState(0);
  const [nextClickCount, setNextClickCount] = useState(0);
  const responsiveTagCount = 3;
  // const handleNextClick = () => {
  //   if (nextClickCount < 4) {
  //     setStartIndex((prevIndex) => prevIndex + 3);
  //     setNextClickCount((prevCount) => prevCount + 1);
  //   }
  // };

  // const handlePrevClick = () => {
  //   if (nextClickCount > 0) {
  //     setStartIndex((prevIndex) => prevIndex - 3);
  //     setNextClickCount((prevCount) => prevCount - 1);
  //   }
  // };

  // const calculateMarginLeft = () => `-${startIndex * 20}%`;

  const onSearch = (value: string) => {
    console.log("Search value:", value);
    // Call the onSubmit prop passed from the parent component
    onSubmit(value);
  };

  return (
    <nav className="navbar">
      <div className="first-line">
        <div className="logo">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
          <div className="search-box">
            <Space direction="vertical">
              <Select
                mode="tags"
                placeholder="Select tags"
                style={{ width: 600, display: "inline-block" }}
                maxTagCount={responsiveTagCount}
                maxTagTextLength={10}
                onSearch={onSearch}
              >
                {tags.map((tag, index) => (
                  <Option key={index}>
                    <Tag>{tag}</Tag>
                  </Option>
                ))}
              </Select>
            </Space>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="user-actions">
            <Link to={"/signin"}>
              <Button size="large">Sign in</Button>
            </Link>
            <Link to={"/signup/email"}>
              <Button size="large">Sign up</Button>
            </Link>
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
